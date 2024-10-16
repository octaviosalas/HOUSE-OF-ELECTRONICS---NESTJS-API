import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { response, Request } from 'express';
import Users from 'src/models/UsersModel';

@Injectable()
export class ValidateRolIsNotActualRolMiddleware implements NestMiddleware {

  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async use(req: Request, response: any, next: () => void) {
    console.log("🦖🦖🦖 ValidateRolIsNotActualRolMiddleware")
    const {rol} = req.body
    const {userId} = req.params

    const userData = await this.UserModel.findByPk(userId)
    const userRol = userData.rol

    if(userRol === rol) { 
      throw new BadRequestException("El rol que estas intentando asignarle al usuario es su rol actual")
    }

    next();
  }
}
