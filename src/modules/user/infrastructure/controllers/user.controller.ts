import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { AllUserUseCase } from '../../domain/use-cases/all-user.use-case';
import { FastifyReply } from 'fastify';

@Controller('users')
export class UserController {
  constructor(
    @Inject(AllUserUseCase) private readonly allUserUseCase: AllUserUseCase,
  ) {}

  @Get()
  async allUsers(@Res() res: FastifyReply) {
    const result = await this.allUserUseCase.exec();

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }
}
