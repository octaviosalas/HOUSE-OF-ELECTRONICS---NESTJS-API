import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Products from 'src/models/ProductsModel';

@Module({
  
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Products])],
  exports: [SequelizeModule.forFeature([Products])]

})
export class ProductsModule {}
