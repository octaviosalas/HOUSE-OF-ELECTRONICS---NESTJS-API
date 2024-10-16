import { Module , MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ValidateUserEmailNotExistMiddleware } from '../users/middlewares/validate-user-email-not-exist.middleware';
import { ValidatePasswordsOnRegisterMiddleware } from '../users/middlewares/validate-passwords-on-register.middleware';
import { ValidateUserEmailMiddleware } from '../users/middlewares/validate-user-email.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(ValidateUserEmailNotExistMiddleware, ValidatePasswordsOnRegisterMiddleware)
        .forRoutes(
          {path:"/auth/registerNewUserAccount",  method: RequestMethod.POST},
        )  
      .apply(ValidateUserEmailMiddleware)
        .forRoutes(
          {path:"/auth/userLogginAccount",  method: RequestMethod.POST},
        )    
   }
}
