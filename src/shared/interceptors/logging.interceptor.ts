import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private logger = new Logger(RequestLoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const { originalUrl, method, ip } = req;

    const reqNow = Date.now();

    return next.handle().pipe(
      tap(() => {
        const resNow = Date.now();
        this.logger.log(
          `IP: ${ip} Path: ${originalUrl} method: ${method} - Respond Time: ${
            resNow - reqNow
          }ms`,
        );
      }),
    );
  }
}
