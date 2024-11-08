import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/createProduct")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get("/everyProducts")
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get('/oneProductData/:productId')
  async findOne(@Param('productId', ParseIntPipe) productId: number) {
    try {
      return this.productsService.findOne(productId);
    } catch (error) {
      throw error
    }
  }

  @Get('/productBranchActualStock/:productId')
  async productsBranchStock(@Param('productId', ParseIntPipe) productId: number) {
    try {
      return this.productsService.getProductsBranchStock(productId);
    } catch (error) {
      throw error
    }
  }

  @Patch('/updateProductData/:productId')
  updateProductData(@Param('productId', ParseIntPipe) productId: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
