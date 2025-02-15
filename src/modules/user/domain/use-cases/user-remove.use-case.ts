export interface UserRemoveUseCase {
  exec(id: number): Promise<boolean>;
}

export const UserRemoveUseCase = Symbol('UserRemoveUseCase');