import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response, Request } from 'express';
import Products from 'src/models/ProductsModel';
import Stock from 'src/models/StockMode';

@Injectable()
export class ValidateProductsDetailStock implements NestMiddleware {

  constructor(@InjectModel(Products) private ProductsModel: typeof Products,
              @InjectModel(Stock) private StockModel: typeof Stock) {}

  async use(req: Request, res: Response, next: () => void) {
    
    const {saleDetail} = req.body
    const {branchId} = req.params

    try {
      await Promise.all(

         saleDetail.map(async(product : any) => { 

          const productData = await this.StockModel.findOne({ 
            where: { 
                productId: Number(product.productId),
                branchId: Number(branchId)
            }  
          })
          console.log("bro", productData)
                  
          if(productData.quantity < product.quantity) { 
            const productInfo = await this.ProductsModel.findByPk(product.productId)
            throw new BadRequestException(`El artículo ${productInfo.name} no tiene el stock suficiente, su cantidad disponible es de ${productData.quantity}`);
          } 
         })
      )
      next()
    } catch (error) {
      throw new BadRequestException(error);
    }

  }
}

