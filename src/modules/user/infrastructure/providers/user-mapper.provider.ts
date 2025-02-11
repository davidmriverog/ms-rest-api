import { Provider } from '@nestjs/common';


import { UserDtoToBoMapper } from '@modules/user/infrastructure/mappers/user-dto-to-bo.mapper';
import { UserEntityToBoMapper } from '@modules/user/infrastructure/mappers/user-entity-to-bo.mapper';
import { UserRawToEntityMapper } from '@modules/user/infrastructure/mappers/user-raw-to-entity.mapper';
import { UserBoToResponseMapper } from '@modules/user/infrastructure/mappers/user-bo-to-response.mapper';

export const USER_MAPPERS: Provider[] = [
  UserDtoToBoMapper,
  UserEntityToBoMapper,
  UserRawToEntityMapper,
  UserBoToResponseMapper,
];
