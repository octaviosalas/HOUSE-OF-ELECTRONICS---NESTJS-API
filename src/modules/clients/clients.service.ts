import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import Clients from 'src/models/ClientsModel';

@Injectable()
export class ClientsService {

  constructor(@InjectModel(Clients) private ClientModel: typeof Clients) { }

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findAll() {
    return `This action retur client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
