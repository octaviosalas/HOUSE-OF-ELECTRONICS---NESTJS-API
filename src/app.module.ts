import { Module } from '@nestjs/common';
import { DataBaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { StockModule } from './modules/stock/stock.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [DataBaseModule, AuthModule, ProductsModule, StockModule, ClientsModule]
})
export class AppModule {}
