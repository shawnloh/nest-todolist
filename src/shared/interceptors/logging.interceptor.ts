import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const { originalUrl, method, params, query, body } = req;

    const reqNow = Date.now();

    return next.handle().pipe(
      tap(() => {
        const resNow = Date.now();
        this.logger.log(
          `Path: ${originalUrl} method: ${method} - Respond Time: ${
            resNow - reqNow
          }ms `,
        );
      }),
    );
  }
}
