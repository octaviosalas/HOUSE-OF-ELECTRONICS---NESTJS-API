import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validateTokenData } from 'src/utils/ValidateTokenData';

@Injectable()
export class UserRolGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest()

    console.log(request.headers["usertokenvalidation"])


    const literalToken = request.headers["usertokenvalidation"]
    const tokenResponseValues = validateTokenData(literalToken)

    if(typeof tokenResponseValues === "string") { 
      throw new BadRequestException("Ocurrio un error en la validacion del token")
    }

    if(tokenResponseValues.expired) { 
      throw new BadRequestException("El token expiro")
    }

    if(tokenResponseValues.role !== "Dueño") { 
      return false
    }

    console.log("ACA ESTA LA RESPUESTA DEL TOKEN", tokenResponseValues)

    return true;
  }
}
