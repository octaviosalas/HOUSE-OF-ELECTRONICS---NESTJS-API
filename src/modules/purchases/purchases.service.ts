import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/sequelize';
import Purchases from 'src/models/PurchasesModel';
import PurchasesDetail from 'src/models/PurchasesDetail';
import { IncrementStockByPurchases } from 'src/utils/incrementStockByPurchases';
import Products from 'src/models/ProductsModel';

@Injectable()
export class PurchasesService {

  constructor(@InjectModel(Purchases) private PrurchaseModel: typeof Purchases,
             @InjectModel(PurchasesDetail) private PrurchaseDetailModel: typeof PurchasesDetail,
             @InjectModel(Products) private ProductsModel: typeof Products) {}

  async create(createPurchaseDto: CreatePurchaseDto, branchId: number) {

    const {purchaseDetail, purchaseDate, totalAmount} = createPurchaseDto
    
    try {
       const newPurchaseData = await this.PrurchaseModel.create({ 
          purchaseDate: purchaseDate,
          totalAmount: totalAmount,
          branchId: branchId,
       })

       await Promise.all(purchaseDetail.map((async(data) => { 
          const createPurchaseNow = await this.PrurchaseDetailModel.create({ 
              purchaseId: newPurchaseData.id,
              poductId: data.productId,
              quantity: data.quantity,
              unitaryPrice: data.unitaryPrice,
              totalPrice: data.totalPrice
          })
          return createPurchaseNow
       }))) 

       await IncrementStockByPurchases(branchId, purchaseDetail)

       return { 
        message: "Compra realizada con exito"
       }

    } catch (error) {
       throw new BadRequestException(error)
    }
 
  }

 async branchHistoricPurchases(branchId: number) {
    try {
      const branchPurchases = await this.PrurchaseModel.findAll({ 
        where: { 
          branchId: branchId
        },
        attributes: {exclude:["createdAt", "updatedAt"]},
        include: [
          { 
          "model": this.PrurchaseDetailModel,
          "as": "purchaseData",
          include: [{ 
            "model": this.ProductsModel,
            "as": "productData"
          }]
         }
      ]
      })
      return branchPurchases
    } catch (error) {
      throw new BadRequestException("Ocurrio un error obteniendo las compras de esta sucursal")
    }
  }

  findOne(purchaseId: number) {
    return `This action returns a #${purchaseId} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
