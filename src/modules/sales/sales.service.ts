import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import Sales from 'src/models/SalesModel';
import SalesDetail from 'src/models/SalesDetail';

@Injectable()
export class SalesService {

  constructor(
    @InjectModel(Sales) private SalesModel: typeof Sales,
    @InjectModel(SalesDetail) private SalesDetailModel: typeof SalesDetail
  ) {}

  async create(createSaleDto: CreateSaleDto, clientId: number, userId: number, branchId: number) {

       const {total, saleDate, saleDetail} = createSaleDto

       try {
        const newSaleData = await this.SalesModel.create({ 
          userId: userId,
          clientId: clientId,
          branchId: branchId,
          saleDate: saleDate,
          totalAmount: total
        })

        const newDetails = await Promise.all(saleDetail.map(async (prods) => {
          const data = await this.SalesDetailModel.create({
            saleId: newSaleData.id,
            productId: prods.productId,
            quantity: prods.quantity,  
            unitaryPrice: prods.unitaryPrice,
            totalPrice: prods.totalPrice,
          });
          return data;
        }));
   
        return { newSale: newSaleData, saleDetails: newDetails };

        

       } catch (error) {
          console.log(error)
       }
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
