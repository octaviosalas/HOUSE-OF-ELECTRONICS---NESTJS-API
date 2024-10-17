import Stock from "src/models/StockMode"
import { BadRequestException } from "@nestjs/common"

type detailData =  { 
    quantity: number,
    productId: number,
    unitaryPrice: number,
    totalPrice: number
}

export const discountStock = async (data: detailData[], branchId: number) => { 

    console.log("DISCOUNT STOCK BRANCHID", branchId)
    console.log("DISCOUNT STOCK data", data)

    try {
        await Promise.all(data.map(async(prod) => { 
            const stockItem = await Stock.findOne({ 
                where: { 
                    productId: prod.productId,
                    branchId: branchId
                }
            })
            stockItem.quantity = stockItem.quantity - prod.quantity
            await stockItem.save()
        }))
    } catch (error) {
         throw new BadRequestException("Ocurrio un error descontando el stock")
    }
}