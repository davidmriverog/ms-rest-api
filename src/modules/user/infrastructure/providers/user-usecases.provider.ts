import { Provider } from '@nestjs/common';

import { UserAllUseCase } from '../../domain/use-cases/user-all.use-case';
import { UserAllUseCaseCaseImpl } from '../../application/user-all-impl.use-case';
import { UserFindByIdUseCase } from '../../domain/use-cases/user-find-by-id.use-case';
import { UserFindByIdUseCaseImpl } from '../../application/user-find-by-id-impl.use-case';

export const USER_USE_CASES_PROVIDERS: Provider[] = [
  {
    provide: UserAllUseCase,
    useClass: UserAllUseCaseCaseImpl,
  },
  {
    provide: UserFindByIdUseCase,
    useClass: UserFindByIdUseCaseImpl,
  },
];
