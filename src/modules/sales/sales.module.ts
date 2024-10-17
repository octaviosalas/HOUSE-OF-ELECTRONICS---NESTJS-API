import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ValidateUserExistenseMiddleware } from '../users/middlewares/validate-user-existense.middleware';
import { UsersModule } from '../users/users.module';
import { ValidateClientExist } from '../clients/middlewares/validate-client-exist.middleware';
import { ValidateBranchExistenseMiddleware } from '../branch/middlewares/validate-branch-existense.middleware';
import { ValidateProductsDetailexistense } from './middlewares/validate-productsDetail-existense.middleware';
import { ValidateProductsDetailStock } from './middlewares/validate-productsDetail-stock.middleware';
import { ValidateSaleExist } from './middlewares/validate-saleExist.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import Sales from 'src/models/SalesModel';
import SalesDetail from 'src/models/SalesDetail';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [SequelizeModule.forFeature([Sales, SalesDetail]), UsersModule], //1 - importo modelo
  exports: [SequelizeModule] //exporto modelo
})
  
export class SalesModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
        .apply(
          ValidateUserExistenseMiddleware, 
          ValidateClientExist, 
          ValidateBranchExistenseMiddleware, 
          ValidateProductsDetailexistense,
          ValidateProductsDetailStock)
        .forRoutes(
          {path:"/sales/createNewSale/:clientId/:userId/:branchId",  method: RequestMethod.POST},
        )  
        .apply(ValidateSaleExist)
        .forRoutes(
          {path:"/sales/oneSaleData/:saleId",  method: RequestMethod.GET},
        )  
        .apply(ValidateBranchExistenseMiddleware)
        .forRoutes(
          {path:"/sales/salesByBranch/:branchId",  method: RequestMethod.GET},
        )  
     
   }
}
