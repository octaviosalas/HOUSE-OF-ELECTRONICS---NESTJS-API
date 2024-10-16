import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import Users from 'src/models/UsersModel';
import { validateTokenData } from 'src/utils/ValidateTokenData';

@Injectable()
export class UserIdGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log("Pasando por el GUARD ❤️ UserIdGuard ❤️")
    const request = context.switchToHttp().getRequest()
    const tokenValue = request.headers["usertokenvalidation"]

    const tokenResponse = validateTokenData(tokenValue)

    if(!tokenValue) { 
      throw new BadRequestException("El token ingresado no es valido")
    }
    
    if(typeof tokenResponse === "string") { 
      throw new BadRequestException("El token es invalido o expiro")
    }

    if(tokenResponse.expired) { 
      throw new BadRequestException("El token ha expirado")
    }

    request.userId = tokenResponse.sub

    return true;
  }
}
