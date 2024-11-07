import { HttpException, Injectable,HttpStatus, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response, Request } from 'express';
import Users from 'src/models/UsersModel';

@Injectable()
export class ValidateUserExistenseMiddleware implements NestMiddleware {

  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async use(req: Request, res: Response, next: () => void) {

    console.log("M I D L E W A R E 🦖🦖🦖🦖 ValidateUserExistenseMiddleware")
    
    const {userId} = req.params
    const userData = await this.UserModel.findByPk(userId)
    if(!userData) { 
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    next();
  }
}
