import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RestLogger } from '../../logger';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: RestLogger) {
    this.logger.setContext('HTTP');
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { ip, method, url, headers, body, query } = request;

    const tracker = headers['X-Tracker-ID'];

    this.logger.setTracker(tracker);

    if (url !== '/metrics')
      return this.execute(
        ip,
        method,
        url,
        context,
        next,
        method != 'GET' ? body : query,
      );

    return next.handle();
  }

  execute(
    ip: string,
    method: string,
    url: string,
    context: ExecutionContext,
    next: CallHandler<any>,
    body: any,
  ): Observable<any> {
    this.logger.log(
      `Start Request - IP=[${ip}] METHOD=[${method}] PATH=[${url}] ${method != 'GET' ? 'DATA' : 'PARAMS'}=[${JSON.stringify(body)}]`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;

        if (url !== '/metrics')
          this.logger.log(
            `End Request - IP=[${ip}] METHOD=[${method}] PATH=[${url}] STATUS=[${statusCode}] : DURATIONS=[${Date.now() - now}ms]`,
          );
      }),
    );
  }
}
