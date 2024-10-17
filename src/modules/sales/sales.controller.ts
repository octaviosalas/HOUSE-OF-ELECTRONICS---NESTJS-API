import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AuthGuard } from '../auth/Guard/auth.guard';
import { Roles } from '../users/decorators/user-rol-decorator';
import { UserRolGuard } from '../auth/Guard/user-rol-guard.guard';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post("/createNewSale/:clientId/:userId/:branchId")
  @UseGuards(AuthGuard, UserRolGuard) 
  @Roles("Dueño", "Encargado")
    create(@Body() createSaleDto: CreateSaleDto,
           @Param('clientId', ParseIntPipe) clientId: number,
           @Param('userId', ParseIntPipe) userId: number,
           @Param('branchId', ParseIntPipe) branchId: number
          ) { 
    return this.salesService.create(createSaleDto, clientId, userId, branchId);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get('/oneSaleData/:saleId')
  @UseGuards(AuthGuard)
  findOne(@Param('saleId', ParseIntPipe) saleId: number) {
    return this.salesService.findOne(saleId);
  }

  @Get('/salesByBranch/:branchId')
  @UseGuards(AuthGuard)
  findSalesByBranch(@Param('branchId', ParseIntPipe) branchId: number) {
    return this.salesService.findSalesByBranch(branchId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
