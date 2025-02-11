import { UserCreateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';

export interface UserCreateUseCase {
  exec(dto: UserCreateDto): Promise<UserResponse>;
}

export const UserCreateUseCase = Symbol('UserCreateUseCase');