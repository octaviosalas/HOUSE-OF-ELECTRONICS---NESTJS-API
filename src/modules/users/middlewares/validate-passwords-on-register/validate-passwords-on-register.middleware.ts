import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import Users from 'src/models/UsersModel';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ValidatePasswordsOnRegisterMiddleware implements NestMiddleware {

  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async use(req: Request, res: Response, next: () => void) {
    console.log("❤️❤️❤️❤️ MIDDLEWARE DETECTED: ValidatePasswordsOnRegisterMiddleware ❤️❤️❤️❤️")
    const {password, repeated_password} = req.body

    if(password !== repeated_password) { 
      throw new BadRequestException("Las contraseñas deben ser iguales")
    }

    next();
  }
}
