import { Provider } from '@nestjs/common';

import { USER_PORTS } from './user-ports.provider';
import { USER_USE_CASES_PROVIDERS } from './user-usecases.provider';
import { USER_MAPPERS } from './user-mapper.provider';
import { USER_PERSISTENCE } from './user-persistence.provider';

export const USER_PROVIDERS: Provider[] = [
  ...USER_PORTS,
  ...USER_USE_CASES_PROVIDERS,
  ...USER_MAPPERS,
  ...USER_PERSISTENCE,
];
