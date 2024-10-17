import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response, Request } from 'express';
import Products from 'src/models/ProductsModel';

@Injectable()
export class ValidateProductsDetailexistense implements NestMiddleware {

  constructor(@InjectModel(Products) private ProductsModel: typeof Products) {}

  async use(req: Request, res: Response, next: () => void) {
    
    const {saleDetail} = req.body

    try {
      await Promise.all(
         saleDetail.map(async(product) => { 
          const productData = await this.ProductsModel.findByPk(product.productId);
          if (!productData) {
            throw new BadRequestException(`El artículo con ID ${product.productId} no existe.`);
          }
          return productData;
         })
      )
      next()
    } catch (error) {
      throw new BadRequestException(error);
    }

  }
}


