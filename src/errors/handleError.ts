import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {


  catch(exception: HttpException, host: ArgumentsHost) {

    console.log("❌")

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log("👇", exception.message)

    let errorResponse;
    if(exception instanceof BadRequestException) { 
        console.log("RESPONDO!", exception.getResponse()["message"])
        errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.getResponse()["message"],
      };

    } else { 
      console.log("RESPONDO ACA!")
        errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      };
      
    }
    
    response.status(status).json(errorResponse);
    

  }
}

