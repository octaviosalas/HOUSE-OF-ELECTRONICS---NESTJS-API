import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import Clients from 'src/models/ClientsModel';

@Injectable()
export class ValidateClientExist implements NestMiddleware {

  constructor(@InjectModel(Clients) private ClientModel: typeof Clients) {}

  async use(req: Request, res: Response, next: () => void) {

    const {clientId} = req.params
    console.log("soy ValidateClientExist", clientId)
    
    const clientData = await this.ClientModel.findByPk(clientId)

    if(!clientData) { 
     throw new BadRequestException("El cliente no existe almacenado en la base de datos")
    }

    next();
  }
}
