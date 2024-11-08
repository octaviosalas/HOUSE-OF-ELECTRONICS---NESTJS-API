import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Products from 'src/models/ProductsModel';
import { ValidateProductExistenseMiddleware } from './middlewares/validate-product-existense.middleware';
import Stock from 'src/models/StockMode';
import Branch from 'src/models/BranchModel';

@Module({
  
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Products, Stock, Branch])],
  exports: [SequelizeModule.forFeature([Products])]

})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(ValidateProductExistenseMiddleware)
        .forRoutes(
          {path:"/products/oneProductData/:productId",  method: RequestMethod.GET},
          {path:"/products/productBranchActualStock/:productId",  method: RequestMethod.GET},
        )
        
   }
}

