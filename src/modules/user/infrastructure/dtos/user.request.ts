import { PartialType } from '@nestjs/swagger';
import { UserDto } from '@modules/user/infrastructure/dtos/user.dto';

export class UserCreateDto extends PartialType(UserDto) {
  //
}

export class UserUpdateDto extends PartialType(UserDto) {
  //
}