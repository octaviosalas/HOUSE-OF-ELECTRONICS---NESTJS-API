import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { AuthGuard } from '../auth/Guard/auth.guard';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post("/createPurchase/:branchId")
  @UseGuards(AuthGuard)
  create(@Body() createPurchaseDto: CreatePurchaseDto, @Param("branchId", ParseIntPipe) branchId: number) {
    return this.purchasesService.create(createPurchaseDto, branchId);
  }

  @Get("/branchPurchases/:branchId")
  @UseGuards(AuthGuard)
  findAll(@Param("branchId", ParseIntPipe) branchId: number) {
    return this.purchasesService.branchHistoricPurchases(branchId);
  }

  @Get('/onePurchaseData/:purchaseId')
  findOne(@Param('purchaseId', ParseIntPipe) purchaseId: number) {
    return this.purchasesService.findOne(purchaseId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchasesService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(+id);
  }
}
