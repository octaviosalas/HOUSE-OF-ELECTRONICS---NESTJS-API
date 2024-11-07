import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import Users from 'src/models/UsersModel';
import { SequelizeModule } from '@nestjs/sequelize';
import Sales from 'src/models/SalesModel';
import Branch from 'src/models/BranchModel';
import Clients from 'src/models/ClientsModel';
import SalesDetail from 'src/models/SalesDetail';
import Purchases from 'src/models/PurchasesModel';
import Stock from 'src/models/StockMode';
import Products from 'src/models/ProductsModel';
import PurchasesDetail from 'src/models/PurchasesDetail';
import { ValidateUserExistenseMiddleware } from './middlewares/validate-user-existense.middleware';
import { ValidateRolIsNotActualRolMiddleware } from './middlewares/validate-rol-is-not-actual-rol.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Users, Sales, Branch, Clients, SalesDetail, Purchases, Stock, Products, PurchasesDetail])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule.forFeature([Users])]
})

export class UsersModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(ValidateUserExistenseMiddleware)
        .forRoutes(
          {path:"/users/changeUserRol/:userId",  method: RequestMethod.PATCH},
          {path:"/users/deleteUser/:userId",  method: RequestMethod.DELETE},
          {path:"/users/updateUserData/:userId",  method: RequestMethod.PATCH},
        )
        .apply(ValidateRolIsNotActualRolMiddleware)
      .forRoutes(
          {path:"/users/changeUserRol/:userId",  method: RequestMethod.PATCH},
      )    
        
   }
}
