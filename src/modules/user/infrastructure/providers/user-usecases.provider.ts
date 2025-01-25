import { Provider } from '@nestjs/common';
import { AllUserUseCase } from '../../domain/use-cases/all-user.use-case';
import { AllUserUseCaseImpl } from '../../application/all-user-impl.use-case';

export const USER_USE_CASES_PROVIDERS: Provider[] = [
  {
    provide: AllUserUseCase,
    useClass: AllUserUseCaseImpl,
  },
];
