import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import Clients from 'src/models/ClientsModel';

@Injectable()
export class ValidateClientIsNewMiddleware implements NestMiddleware {

  constructor(@InjectModel(Clients) private ClientModel: typeof Clients) {}

  async use(req: Request, res: Response, next: () => void) {

    console.log("Pasando por el MIDLEWARE ValidateClientIsNewMiddleware 👍👍👍")

    const {dni} = req.body
    
    const clientData = await this.ClientModel.findOne({ 
      where: { 
        dni: dni
      }
    })

    if(clientData) { 
      throw new BadRequestException("El cliente ya existe almacenado en la base de datos")
    }

    next();
  }
}
