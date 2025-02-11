import { Provider } from '@nestjs/common';

import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserAdapter } from '@modules/user/infrastructure/adapters/user.adapter';

export const USER_PORTS: Provider[] = [
  {
    provide: UserPort,
    useClass: UserAdapter,
  },
];
