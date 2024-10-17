import { BadRequestException } from "@nestjs/common"
import Stock from "src/models/StockMode"


type productsToUpdateStock = { 
    productId: number,
    quantity: number
}

export const IncrementStockByPurchases = async (branchId: number, products: productsToUpdateStock[])  => { 
      try {
         await Promise.all(products.map(async(prod) => { 
            const productStockData = await Stock.findOne({ 
                where: { 
                    branchId: branchId,
                    productId: prod.productId
                }
            })
            productStockData.quantity =  productStockData.quantity + prod.quantity
            await productStockData.save()
         }))
      } catch (error) {
        throw new BadRequestException("Ocurrio un error en la incrementacion del stock")
      }
}