import { Provider } from '@nestjs/common';

import { UserMapper } from '@modules/user/infrastructure/mappers/user.mapper';

export const USER_MAPPERS: Provider[] = [
  UserMapper
];
