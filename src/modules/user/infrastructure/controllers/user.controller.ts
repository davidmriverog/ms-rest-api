import {
  Body,
  Controller, Delete,
  Get,
  HttpStatus,
  Inject,
  Param, Post, Put,
  Res, UseFilters,
} from '@nestjs/common';
import { ErrorResponse } from '@bomb/core/domain';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { UserCreateDto, UserUpdateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserErrorFilter } from '@modules/user/infrastructure/exceptions/user.filter';
import { UserAllUseCase } from '@modules/user/domain/use-cases/user-all.use-case';
import { UserFindByIdUseCase } from '@modules/user/domain/use-cases/user-find-by-id.use-case';
import { UserCreateUseCase } from '@modules/user/domain/use-cases/user-create.use-case';
import { UserUpdateUseCase } from '@modules/user/domain/use-cases/user-update.use-case';
import { UserRemoveUseCase } from '@modules/user/domain/use-cases/user-remove.use-case';

@ApiTags('users')
@Controller('users')
@UseFilters(UserErrorFilter)
export class UserController {
  constructor(
    @Inject(UserAllUseCase)
    private readonly userAllUseCase: UserAllUseCase,
    @Inject(UserFindByIdUseCase)
    private readonly userFindByIdUseCase: UserFindByIdUseCase,
    @Inject(UserCreateUseCase)
    private readonly userCreateUseCase: UserCreateUseCase,
    @Inject(UserUpdateUseCase)
    private readonly userUpdateUseCase: UserUpdateUseCase,
    @Inject(UserRemoveUseCase)
    private readonly userRemoveUseCase: UserRemoveUseCase,
  ) {}

  @Get()
  @ApiResponse({ type: UserResponse, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponse })
  async all(@Res() res: FastifyReply) {
    const result = await this.userAllUseCase.exec();

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

  @Put(':id')
  @ApiResponse({ type: UserResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  async update(@Param('id') id: number, @Body() dto: UserUpdateDto, @Res() res: FastifyReply) {
    const result = await this.userUpdateUseCase.exec(id, dto);

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }

  @Delete(':id')
  @ApiResponse({ type: Boolean })
  @ApiNotFoundResponse({ type: ErrorResponse })
  async remove(@Param('id') id: number, @Res() res: FastifyReply) {
    const result = await this.userRemoveUseCase.exec(id);

    return res.type('application/json').code(HttpStatus.OK).send(result);
  }
}
