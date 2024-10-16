import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Stock from 'src/models/StockMode';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [SequelizeModule.forFeature([Stock])]
})
export class StockModule {}
