import { Controller, Get, Request, Body, Patch, Param, Delete, ParseIntPipe, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { UserRolGuard } from '../auth/Guard/user-rol-guard.guard';
import { Roles } from './decorators/user-rol-decorator';
import { AuthGuard } from '../auth/Guard/auth.guard';
import { ChangeRolDto } from './dto/change-rol.dto';
import { UserIdGuard } from '../auth/Guard/user-id.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/everyUsers")
  @UseGuards(AuthGuard, UserRolGuard) 
  @Roles("Dueño")
  findAll() {
    return this.usersService.findAll();
  }

  
  @Get('/oneUserData/:userId')
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    try {
      console.log("Intento de resolucion!")
      const response =  this.usersService.findOne(userId);
      return response
    } catch (error) {
      /* if(error instanceof HttpException) { 
        console.log("Asi, puedo ir gestionando desde mi captura de errores, los diferentes errores posibles")
      }*/
      throw error;
    }
  }
  

  @Patch('/updateUserData/:userId')
  @UseGuards(UserIdGuard)
  update(
    @Param('userId', ParseIntPipe) userId: number, 
    @Body() updateUserDto: UpdateUserDto, 
    @Request() req : any
  ) {
    const userDataId = req.userId
    return this.usersService.update(userId, Number(userDataId), updateUserDto);
  }


  @Patch('/changeUserRol/:userId')
  @UseGuards(AuthGuard, UserRolGuard)
  @Roles("Encargado", "Dueño")
  changeUserRol(@Param('userId', ParseIntPipe) userId: number, @Body() ChangeRolDto: ChangeRolDto) {
    return this.usersService.updateUserRol(userId, ChangeRolDto);
  }


  @Delete('/deleteUser/:userId')
  @UseGuards(AuthGuard, UserRolGuard)
  @Roles("Dueño")
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }





}
