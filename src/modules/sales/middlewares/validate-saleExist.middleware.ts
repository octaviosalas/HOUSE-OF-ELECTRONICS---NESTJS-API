import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response, Request } from 'express';
import Products from 'src/models/ProductsModel';
import Sales from 'src/models/SalesModel';
import Stock from 'src/models/StockMode';

@Injectable()
export class ValidateSaleExist implements NestMiddleware {

  constructor(@InjectModel(Sales) private SalesModel: typeof Sales) {}

  async use(req: Request, res: Response, next: () => void) {
    
    console.log("MI D D L E W A R E ValidateSaleExist 🦖🦖")
    const {saleId} = req.params

    try {
        const saleData = await this.SalesModel.findByPk(saleId)
        if(!saleData) { 
            throw new BadRequestException("La venta no existe")
        }
        next()
    } catch (error) {
      throw new BadRequestException(error);
    }

  }
}

