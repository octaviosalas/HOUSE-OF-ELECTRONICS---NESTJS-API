import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import Users from 'src/models/UsersModel';
import { ChangeRolDto } from './dto/change-rol.dto';
import Sales from 'src/models/SalesModel';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async findAll() {
      try {
         const users = await this.UserModel.findAll()
         return users
      } catch (error) {
         throw new BadRequestException({ 
          message: "Ocurrio un error en la obtencion de todos los usuarios",
          error: error
         })
      }
  } 

  

  async findOne(userId: number) {
    try {
      const userData = await this.UserModel.findByPk(userId)
      return userData
   } catch (error) {
      throw new BadRequestException({ 
       message: "Ocurrio un error en la obtencion de todos los usuarios",
       error: error
      })
   }
  }

  async updateUserRol(userId: number, ChangeRolDto: ChangeRolDto) {
      try {
        const userSelected = await this.UserModel.findByPk(userId)
        userSelected.rol = ChangeRolDto.rol
        await userSelected.save()
        return { 
          message: `El rol del usuario fue cambiado con exito a ${ChangeRolDto.rol}`,
          userData: userSelected
        }
      } catch (error) {
        throw new BadRequestException({ 
          message: "Ocurrio un error en la actualizacion del rol del usuario",
          error: error
         })
      }    
  }

  async update(userId: number, userDataId: number, updateUserDto: UpdateUserDto) {

        console.log(userId)
        console.log(userDataId)
        if(userId !== userDataId) { 
          throw new BadRequestException("No podes editar los datos de un usuario sin ser el usuario")
        }
    
        const userData = await this.UserModel.findByPk(userId)
        userData.email = updateUserDto.email;
        userData.name = updateUserDto.name;
        userData.age = updateUserDto.age
        await userData.save()
    
        return { 
          message: "Se editaron correctamente los datos",
          userData: userData
        }      
    

  }

  async remove(userId: number) {
    try {
      const user = await this.UserModel.findByPk(userId)
      user.destroy()
      return { 
        message: "El usuario fue correctamente eliminado"
      } 
    } catch (error) {
      throw new BadRequestException({ 
        message: "Ocurrio un error en la eliminacion del usuario",
        error: error
       })
    }
  }
}
