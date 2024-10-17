import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import Sales from 'src/models/SalesModel';
import SalesDetail from 'src/models/SalesDetail';
import { discountStock } from 'src/utils/discountStock';
import Users from 'src/models/UsersModel';
import Clients from 'src/models/ClientsModel';
import Products from 'src/models/ProductsModel';
import Branch from 'src/models/BranchModel';

@Injectable()
export class SalesService {

  constructor(
    @InjectModel(Sales) private SalesModel: typeof Sales,
    @InjectModel(SalesDetail) private SalesDetailModel: typeof SalesDetail,
    @InjectModel(Users) private UsersModel: typeof SalesDetail,
    @InjectModel(Clients) private ClientsModel: typeof Clients,
    @InjectModel(Products) private ProductsModel: typeof Clients,
    @InjectModel(Branch) private BranchModel: typeof Branch,
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

        await discountStock(saleDetail, Number(branchId))
   
        return { newSale: newSaleData, saleDetails: newDetails }; 

       } catch (error) {
          console.log(error)
       } 
  }

  findAll() {
    return `This action returns all sales`;
  }

  async findOne(saleId: number) {
      try {
        const saleData = await this.SalesModel.findByPk(saleId, { 
          "attributes": {exclude:["createdAt", "updatedAt"]},
          include: [
            { 
            "model": this.UsersModel,
            "as": "userData",
            "attributes": {exclude:["createdAt", "updatedAt"]}
           },
           { 
            "model": this.BranchModel,
            "as": "branchData",
            "attributes": {exclude:["createdAt", "updatedAt"]}
           },
           {
            "model": this.ClientsModel,
            "as": "clientData",
            "attributes": {exclude:["createdAt", "updatedAt"]}
           },
           {
            "model": this.SalesDetailModel,
            "as": "saleData",
            "attributes": {exclude:["createdAt", "updatedAt"]},
            include: [{ 
              "model": this.ProductsModel,
              "as": "productData",
              "attributes": {exclude:["createdAt", "updatedAt"]}
            }]
           }
        ]
        })
        return { 
          saleData
        }
      } catch (error) {
        throw new BadRequestException("Ocurrio un error en la obtencion de la tarea")
      }
  }


  async findSalesByBranch (branchId: number) { 
     try {
        const branchSales = await this.SalesModel.findAll({ 
          where: { 
            branchId: branchId,
          },
          include: [
            {
            "model": this.SalesDetailModel,
            "as": "saleData",
            "attributes": {exclude:["createdAt", "updatedAt"]},
            include: [{
              "model": this.ProductsModel,
              "as": "productData",
              "attributes": {exclude:["createdAt", "updatedAt"]}
            }]
            },
            {
              "model": this.ClientsModel,
              "as": "clientData",
              "attributes": {exclude:["createdAt", "updatedAt"]}
            }
          ]
        })

        const getTotalAmoutFactured = branchSales.reduce((acc, el) => acc + el.totalAmount, 0)

        return {data: branchSales, quantitySales: branchSales.length, totalAmountFactured: getTotalAmoutFactured}
     
      } catch (error) {
       console.log(error)
       throw new BadRequestException("Hubo un error en la busqueda de ventas por sucursal", error)
     }
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
