import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response, Request } from 'express';
import Users from 'src/models/UsersModel';

@Injectable()
export class ValidateUserEmailNotExistMiddleware implements NestMiddleware {

  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async use(req: Request, res: Response, next: () => void) {

    console.log("❤️❤️❤️❤️ MIDDLEWARE DETECTED: ValidateUserEmailNotExistMiddleware ❤️❤️❤️❤️")

    const {email} = req.body

    const userData = await this.UserModel.findOne({ 
      where: { 
        email: email
      }
    })

    if(userData !== null) { 
      console.log("EL USUARIO EXISTE")
      throw new BadRequestException("El correo electronico ya existe almacenado")
    }
    console.log("EL USUARIO NOO EXISTE")
    next();
  }
}
