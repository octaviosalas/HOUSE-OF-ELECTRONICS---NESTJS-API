import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import Stock from 'src/models/StockMode';

@Injectable()
export class StockService {

  constructor(@InjectModel(Stock) private StockModel: typeof Stock) {}

  create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }

  async findAll() {
     return console.log("a")
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
