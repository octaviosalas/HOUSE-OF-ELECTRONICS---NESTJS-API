import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Clients from 'src/models/ClientsModel';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [SequelizeModule.forFeature([Clients])]
})
export class ClientsModule {}
