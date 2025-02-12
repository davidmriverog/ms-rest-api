import { UserUpdateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';

export interface UserUpdateUseCase {
  exec(id: number, dto: UserUpdateDto): Promise<UserResponse>;
}

export const UserUpdateUseCase = Symbol('UserUpdateUseCase');