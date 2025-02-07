import { Provider } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntityToBoMapper } from '../mappers/user-entity-to-bo.mapper';
import { UserRawToEntityMapper } from '../mappers/user-raw-to-entity.mapper';

export const USER_MAPPERS: Provider[] = [UserMapper, UserEntityToBoMapper, UserRawToEntityMapper];
