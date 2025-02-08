import { FastifyReply } from 'fastify';
import { ErrorResponse } from '@bomb/core/domain';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserError } from '@modules/user/domain/errors/user.error';
import { userErrorMapping } from '@modules/user/infrastructure/exceptions/user.mapping';

@Catch(UserError)
export class UserErrorFilter implements ExceptionFilter {
  catch(exception: UserError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();

    res
      .code(HttpStatus.NOT_FOUND)
      .type('application/json')
      .send(plainToInstance(ErrorResponse, {
        status: HttpStatus.NOT_FOUND,
        code: exception.message,
        message: userErrorMapping.get(exception.message),
      }));
  }
}
