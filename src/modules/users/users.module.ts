import { Module } from '@nestjs/common';
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

@Module({
  imports: [SequelizeModule.forFeature([Users, Sales, Branch, Clients, SalesDetail, Purchases, Stock, Products, PurchasesDetail])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule.forFeature([Users])]
})
export class UsersModule {}
