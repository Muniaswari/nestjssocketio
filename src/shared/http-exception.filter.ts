import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { writeErroLog } from '../writeErroLog';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
    const errorResponse = {
      code: status,
      ip: request.ip,
      timestamp: new Date().toISOString(),
      path: request.raw.originalUrl,
      method: request.raw.method,
      message: exception.message.error || exception.message || null,
      stack: exception.stack,
      body: JSON.stringify(request.body),
    };
    console.log(errorResponse);
    writeErroLog(errorResponse);
    throw new HttpException(errorResponse.message, status);
    //response.send(errorResponse);
  }
}
