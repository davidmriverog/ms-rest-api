import { HttpException, HttpStatus } from '@nestjs/common';

export class UserError extends HttpException {
  constructor(message) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
