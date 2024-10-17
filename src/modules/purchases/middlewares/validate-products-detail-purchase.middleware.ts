import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import Products from 'src/models/ProductsModel';

@Injectable()
export class ValidateProductsDetailPurchaseMiddleware implements NestMiddleware {

  constructor(@InjectModel(Products) private ProductsModel: typeof Products) {}

  async use(req: Request, res: Response, next: () => void) {

      const {purchaseDetail} = req.body

      console.log(purchaseDetail)

      try {
          await Promise.all(purchaseDetail.map(async(prod : any) => { 
             const productValidation = await this.ProductsModel.findByPk(prod.productId)

              if(!productValidation) { 
                  console.log("ERROR! NO EXISTE EL PRODUCTO")
                  throw new BadRequestException(`El producto con ID ${prod.productId} no existe`)
              } 
              return productValidation
          })
        )
        next();
      } catch (error) {
        throw new BadRequestException(error)
      }
   
  }

}
