import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res, UseFilters,
} from '@nestjs/common';
import { ErrorResponse } from '@bomb/core/domain';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserErrorFilter } from '@modules/user/infrastructure/exceptions/user.filter';
import { UserAllUseCase } from '@modules/user/domain/use-cases/user-all.use-case';
import { UserFindByIdUseCase } from '@modules/user/domain/use-cases/user-find-by-id.use-case';

@ApiTags('users')
@Controller('users')
@UseFilters(UserErrorFilter)
export class UserController {
  constructor(
    @Inject(UserAllUseCase) private readonly allUserUseCase: UserAllUseCase,
    @Inject(UserFindByIdUseCase)
    private readonly userFindByIdUseCase: UserFindByIdUseCase,
  ) {}

  @Get()
  @ApiResponse({ type: UserResponse, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponse })
  async all(@Res() res: FastifyReply) {
    const result = await this.allUserUseCase.exec();

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }

  @Get(':id')
  @ApiResponse({ type: UserResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  async findById(@Param('id') id: string, @Res() res: FastifyReply) {
    const result = await this.userFindByIdUseCase.exec(+id);

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }
}
