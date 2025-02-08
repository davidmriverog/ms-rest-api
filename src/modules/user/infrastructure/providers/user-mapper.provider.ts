import { Provider } from '@nestjs/common';

import { UserEntityToBoMapper } from '../mappers/user-entity-to-bo.mapper';
import { UserRawToEntityMapper } from '../mappers/user-raw-to-entity.mapper';
import { UserBoToResponseMapper } from '../mappers/user-bo-to-response.mapper';

export const USER_MAPPERS: Provider[] = [
  UserEntityToBoMapper,
  UserRawToEntityMapper, UserBoToResponseMapper
];
