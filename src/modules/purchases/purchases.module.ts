import { Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { ValidateBranchExistenseMiddleware } from '../branch/middlewares/validate-branch-existense.middleware';
import { ValidateProductsDetailPurchaseMiddleware } from './middlewares/validate-products-detail-purchase.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import Branch from 'src/models/BranchModel';
import { SalesModule } from '../sales/sales.module';
import Purchases from 'src/models/PurchasesModel';
import PurchasesDetail from 'src/models/PurchasesDetail';
import Products from 'src/models/ProductsModel';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [SequelizeModule.forFeature([Branch, Purchases, PurchasesDetail, Products])]
})

export class PurchasesModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(ValidateBranchExistenseMiddleware, ValidateProductsDetailPurchaseMiddleware)
        .forRoutes(
          {path:"/purchases/createPurchase/:branchId",  method: RequestMethod.POST},       
        )  
      .apply(ValidateBranchExistenseMiddleware)
        .forRoutes(
          {path:"/purchases/branchPurchases/:branchId",  method: RequestMethod.GET},       
        )  
   }
}
