import { UserResponse } from '../../infrastructure/dtos/user.reponse';

export interface UserFindByIdUseCase {
  exec(id: number): Promise<UserResponse>;
}

export const UserFindByIdUseCase = Symbol('UserFindByIdUseCase');
