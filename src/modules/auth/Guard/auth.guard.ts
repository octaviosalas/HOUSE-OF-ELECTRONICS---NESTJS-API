import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validateTokenData } from 'src/utils/ValidateTokenData';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest()
    const token = request.headers["usertokenvalidation"]
    console.log("Pasando por el GUARD ❤️ authGuard ❤️", request.headers["usertokenvalidation"])


    if(request.headers["usertokenvalidation"] == null) { 
      console.log("🛩️😍❤️😒⚡👍😊🤣😂👇")
      throw new BadRequestException("Debes iniciar sesion")
    }

    const tokenResponseData = validateTokenData(token)

    if(typeof tokenResponseData === "string") { 
      throw new BadRequestException("El token es invalido")
    }

    if(tokenResponseData.expired) { 
      throw new BadRequestException("El token expiro")
    }

    return true;
  }
}
