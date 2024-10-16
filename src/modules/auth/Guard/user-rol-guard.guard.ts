import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validateTokenData } from 'src/utils/ValidateTokenData';
import { Reflector } from '@nestjs/core';

//constructor(private reflector: Reflector) {}
// const roles = this.reflector.get<string[]>("roles", context.getHandler())

@Injectable()
export class UserRolGuard implements CanActivate {

  constructor(private reflector: Reflector) {} //El reflector me hace acceder al decorador que tiene el controlador.

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log("❤️❤️❤️❤️UserRolGuard❤️❤️❤️❤️❤️")

    const request = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>("roles", context.getHandler()) //Obtengo el valor que tiene el decorador roles.

    console.log(roles)

    const literalToken = request.headers["usertokenvalidation"]
    const tokenResponseValues = validateTokenData(literalToken)

    console.log("Soy la respuesta de tokenResponseValues - Funcion", tokenResponseValues)

    if(typeof tokenResponseValues === "string") { 
      throw new BadRequestException("Ocurrio un error en la validacion del token")
    }

    if(tokenResponseValues.expired) { 
      throw new BadRequestException("El token expiro")
    }
 

    if(!roles.includes(tokenResponseValues.role)) { 
      return false
    }

    return true;
  }
}
