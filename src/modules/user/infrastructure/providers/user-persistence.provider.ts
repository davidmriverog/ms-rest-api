import { Provider } from '@nestjs/common';

import { UserRepository } from '@modules/user/infrastructure/data-access/repositories/user.repository';
import { UserRepositoryImpl } from '@modules/user/infrastructure/data-access/repositories/impl/user-repository.impl';

export const USER_PERSISTENCE: Provider[] = [
  {
    provide: UserRepository,
    useClass: UserRepositoryImpl,
  },
];
