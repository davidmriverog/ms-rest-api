import { Provider } from '@nestjs/common';

import { UserAllUseCase } from '@modules/user/domain/use-cases/user-all.use-case';
import { UserAllUseCaseCaseImpl } from '@modules/user/application/user-all-impl.use-case';
import { UserFindByIdUseCase } from '@modules/user/domain/use-cases/user-find-by-id.use-case';
import { UserFindByIdUseCaseImpl } from '@modules/user/application/user-find-by-id-impl.use-case';
import { UserCreateUseCase } from '@modules/user/domain/use-cases/user-create.use-case';
import { UserCreateUseCaseImpl } from '@modules/user/application/user-create-impl.use-case';
import { UserUpdateUseCaseImpl } from '@modules/user/application/user-update-impl.use-case';
import { UserUpdateUseCase } from '@modules/user/domain/use-cases/user-update.use-case';

export const USER_USE_CASES_PROVIDERS: Provider[] = [
  {
    provide: UserAllUseCase,
    useClass: UserAllUseCaseCaseImpl,
  },
  {
    provide: UserFindByIdUseCase,
    useClass: UserFindByIdUseCaseImpl,
  },
  {
    provide: UserCreateUseCase,
    useClass: UserCreateUseCaseImpl,
  },
  {
    provide: UserUpdateUseCase,
    useClass: UserUpdateUseCaseImpl,
  },
];
