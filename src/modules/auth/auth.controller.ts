import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')

  export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("/registerNewUserAccount")
  registerUser(@Body() RegisterUserDto: RegisterUserDto) {
    return this.authService.register(RegisterUserDto);
  }

  @Post("/userLogginAccount")
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.logginAccount(createAuthDto);
  }
 
}
