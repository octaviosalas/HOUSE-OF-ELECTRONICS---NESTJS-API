import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import Users from 'src/models/UsersModel';

@Injectable()
export class ValidateUserEmailMiddleware implements NestMiddleware {

  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async use(req: Request, res: Response, next: () => void) {
    console.log("❤️❤️❤️❤️ MIDDLEWARE DETECTED: ValidateUserEmailMiddleware ❤️❤️❤️❤️")
     
    const user = await this.UserModel.findOne({ 
      where: { 
        email: req.body.email
      }
    })

    if(!user) { 
       throw new BadRequestException("El correo electronico no esta almacenado en nuestra base de datos")
    }

    next();
  }
}
