import { TokenResultType, TokenDataType } from "../modules/users/types/TokenTypes"
import * as jwt from "jsonwebtoken"
import { BadRequestException } from "@nestjs/common";

export const validateTokenData = (token: string) => { 

   if(!token) { 
       throw new BadRequestException("No has ingresado el token")
   }

    const decode = jwt.decode(token) as TokenResultType

    const currentDate = new Date();
    const tokenExpiredDate = new Date(decode.exp);
    
    try {
        return {
            sub: decode.sub,
            expired: +tokenExpiredDate <= +currentDate / 10000,
            role: decode.rol
        } 
    } catch (error) {
        return "Token is invalid"
    }
}