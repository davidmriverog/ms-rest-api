import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param, Post,
  Res, UseFilters,
} from '@nestjs/common';
import { ErrorResponse } from '@bomb/core/domain';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserErrorFilter } from '@modules/user/infrastructure/exceptions/user.filter';
import { UserAllUseCase } from '@modules/user/domain/use-cases/user-all.use-case';
import { UserFindByIdUseCase } from '@modules/user/domain/use-cases/user-find-by-id.use-case';
import { UserCreateUseCase } from '@modules/user/domain/use-cases/user-create.use-case';
import { UserCreateDto } from '@modules/user/infrastructure/dtos/user.request';

@ApiTags('users')
@Controller('users')
@UseFilters(UserErrorFilter)
export class UserController {
  constructor(
    @Inject(UserAllUseCase) private readonly allUserUseCase: UserAllUseCase,
    @Inject(UserFindByIdUseCase)
    private readonly userFindByIdUseCase: UserFindByIdUseCase,
    @Inject(UserCreateUseCase)
    private readonly userCreateUseCase: UserCreateUseCase,
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

  @Post()
  @ApiResponse({ type: UserResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  async create(@Body() dto: UserCreateDto, @Res() res: FastifyReply) {
    const result = await this.userCreateUseCase.exec(dto);

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }
}
