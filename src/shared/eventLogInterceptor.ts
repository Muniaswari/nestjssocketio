import { Injectable, Inject } from '@nestjs/common';
import { NestInterceptor } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { connection } from 'mongoose';
import { models, schemalist } from '../shared/constants';
import { dbconfiguration } from './../shared/constants';
import jwtDecode from 'jwt-decode';

@Injectable()
export class EventLogInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = new Date();
    const start = Date.now();
    return next
      .handle()
      .pipe(//map(data => console.log(data))
        tap(async (data) => {
          const [req, res, next] = context.getArgs();
          const { body, raw, params } = req;
          const { id, ip, hostname, _remoteAddress, method, originalUrl } = raw;
          const { statusCode } = res;
          //const request = context.getArgByIndex(0);
          //const response = context.getArgByIndex(1);
          // const re = context.switchToHttp().getResponse<Response>();
        
        }),
      );
  }
}