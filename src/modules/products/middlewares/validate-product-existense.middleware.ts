import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import Products from 'src/models/ProductsModel';

@Injectable()
export class ValidateProductExistenseMiddleware implements NestMiddleware {

  constructor(@InjectModel(Products) private ProductModel: typeof Products) {}

  async use(req: Request, res: Response, next: () => void) {
    
       const {productId} = req.params
       console.log("🛩️🛩️🛩️🛩️ M I D D L E W A R E ValidateProductExistenseMiddleware", productId)

       const product = await this.ProductModel.findByPk(productId)

       if(!product) { 
        throw new HttpException("El producto no existe", HttpStatus.NOT_FOUND)
       }

       next();
  }
}
