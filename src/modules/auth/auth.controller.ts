import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')

  export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("/registerNewUserAccount")
  async registerUser(@Body() RegisterUserDto: RegisterUserDto) {
    try {
      return await this.authService.register(RegisterUserDto);
    } catch (error) {
      throw error
    }
  }

  @Post("/userLogginAccount")
  async create(@Body() createAuthDto: CreateAuthDto) {
    try {
      return this.authService.logginAccount(createAuthDto);
    } catch (error) {
      throw error
    }
  }
 
}
