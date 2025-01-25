import { Provider } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

export const USER_MAPPERS: Provider[] = [UserMapper];
