import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { UserAllUseCase } from '../../domain/use-cases/user-all.use-case';
import { UserFindByIdUseCase } from '../../domain/use-cases/user-find-by-id.use-case';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserAllUseCase) private readonly allUserUseCase: UserAllUseCase,
    @Inject(UserFindByIdUseCase)
    private readonly userFindByIdUseCase: UserFindByIdUseCase,
  ) {}

  @Get()
  async all(@Res() res: FastifyReply) {
    const result = await this.allUserUseCase.exec();

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: FastifyReply) {
    const result = await this.userFindByIdUseCase.exec(+id);

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }
}
