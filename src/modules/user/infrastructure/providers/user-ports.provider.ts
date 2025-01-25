import { Provider } from '@nestjs/common';
import { UserAdapter } from '../adapters/user.adapter';
import { UserPort } from '../../domain/ports/user.port';

export const USER_PORTS: Provider[] = [
  {
    provide: UserPort,
    useClass: UserAdapter,
  },
];
