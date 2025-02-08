import { UserResponse } from '../../infrastructure/dtos/user.reponse';

export interface UserAllUseCase {
  exec(): Promise<UserResponse[]>;
}

export const UserAllUseCase = Symbol('UserAllUseCase');
