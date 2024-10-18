import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response, Request } from 'express';
import Purchases from 'src/models/PurchasesModel';

@Injectable()
export class ValidatePurchaseExistenseMiddleware implements NestMiddleware {

  constructor(@InjectModel(Purchases) private PurchasesModel: typeof Purchases) {}

  async use(req: Request, res: Response, next: () => void) {

    const {purchaseId} = req.params
   console.log("💕💕💕 ValidatePurchaseExistenseMiddleware ")
       const purchaseData = await this.PurchasesModel.findByPk(purchaseId)

       if(!purchaseData) { 
        throw new BadRequestException("La compra que estas intentando buscar no existe")
       }

       next()
  
  }
}
