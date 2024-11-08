import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import Products from 'src/models/ProductsModel';
import Stock from 'src/models/StockMode';
import Branch from 'src/models/BranchModel';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Products) private ProductModel: typeof Products,
              @InjectModel(Stock) private StockModel: typeof Stock,
              @InjectModel(Branch) private BranchModel: typeof Branch) {}

  async create(createProductDto: CreateProductDto) {
   return "hola"
  }

  async findAll() {
    try {
       const productsData = await this.ProductModel.findAll()
       return productsData
    } catch (error) {
       throw new BadRequestException("Ocurrio un error")
    }
  }

  async findOne(productId: number) {
    try {
       const productData = await this.ProductModel.findByPk(productId)
       return productData     
    } catch (error) {
       throw new BadRequestException(error)
    }
  }

  async getProductsBranchStock(productId: number) {
    try {
       const productStockData = await this.StockModel.findAll({ 
        where: { 
          productId: productId,
        },
        attributes: { exclude: ["createdAt", "updatedAt"]  },
        include: [{ 
          model: this.BranchModel,
          as: "branchData",
          attributes: { exclude: ["createdAt", "updatedAt"]  },
         }]
       })
       return productStockData     
    } catch (error) {
       throw new BadRequestException(error)
    }
 
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
