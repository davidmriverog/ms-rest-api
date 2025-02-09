import { BaseError } from '@bomb/core/domain';

export class UserError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
