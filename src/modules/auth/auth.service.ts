import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import Users from 'src/models/UsersModel';
import * as bcrypt from "bcrypt"
import { RegisterUserDto } from './dto/register-user.dto';
import { HttpException } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {

  constructor(@InjectModel(Users) private UserModelInstance: typeof Users) {}

    async signInJwt ({payload, secret, expires}: {payload: jwt.JwtPayload, secret: string; expires: string}) { 
      return jwt.sign(payload, secret, {expiresIn: expires})
    }

    async createUserToken (id: number) { 
      const userData = await this.UserModelInstance.findByPk(id)
      const payLoad = { 
        sub: userData.id.toString(),
        rol: userData.rol
      }
      return { 
        accesToken: await this.signInJwt({ 
            payload: payLoad,
            secret: process.env.JWT_SECRET,
            expires: "1h"
        }),
        userData
      }
    }

    async logginAccount(userData: CreateAuthDto) {

      try {
        const userAccountData = await this.UserModelInstance.findOne({ 
        where: { 
            email: userData.email
        }
      })

      const validatePassword = await bcrypt.compare(userData.password, userAccountData.password)

      if(validatePassword) { 
        console.log("Validada")
        const dataWithToken = await this.createUserToken(userAccountData.id)
        return dataWithToken
      }

      throw new HttpException('La contraseña ingresada es incorrecta', HttpStatus.UNAUTHORIZED)

    
    } catch (error) {
      throw error
    }
    }

    async register(RegisterUserDto: RegisterUserDto) {
      try {
        const {age, name, email, password, rol, dischargeDate} = RegisterUserDto

        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASHED_PASSWORD_NUMBER))
        const newUser = await this.UserModelInstance.create({ 
          age,
          name,
          email,
          password: hashedPassword,
          rol,
          dischargeDate
        })

        return { 
          message: `El usuario ${newUser.name} fue creado exitosamente`,
          userData: newUser
        }

      } catch (error) {
      
      }
    }

}
