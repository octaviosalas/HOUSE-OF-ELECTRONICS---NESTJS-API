import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '../auth/Guard/auth.guard';
import { UserRolGuard } from '../auth/Guard/user-rol-guard.guard';
import { Roles } from '../users/decorators/user-rol-decorator';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  
  @Post("/createClient")
  @UseGuards(AuthGuard, UserRolGuard)
  @Roles("Empleado", "Encargado")
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get("/allClientsData")
  @UseGuards(AuthGuard)
   async findAll() {
    try {
      return await this.clientsService.findAll();      
    } catch (error) {
      console.log("👍upii")
       throw error
    }

  }

  @Get('/getOneClient/:clientId')
  @UseGuards(AuthGuard)
  findOne(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientsService.findOne(clientId);
  }

  @Patch('/updateClientData/:clientId')
  update(@Param('clientId', ParseIntPipe) clientId: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(clientId, updateClientDto);
  }

  @Delete('/deleteClient/:clientId')
  remove(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientsService.remove(clientId);
  }

  @Get("/getClientsSales/:clientId")
  @UseGuards(AuthGuard)
  getClientsEverySales(@Param("clientId", ParseIntPipe) clientId: number) { 
    return this.clientsService.clientsSalesData(clientId)
  }
}
