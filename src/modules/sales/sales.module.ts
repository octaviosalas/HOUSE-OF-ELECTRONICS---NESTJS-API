import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Sales from 'src/models/SalesModel';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [SequelizeModule.forFeature([Sales])]
})
export class SalesModule {}
