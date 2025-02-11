import { DtoBase } from '@bomb/core/infrastructure/dtos/dto-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends DtoBase {
  @ApiProperty({
    type: String,
  })
  readonly username: string;

  @ApiProperty({
    type: String,
  })
  readonly userHash: string;
}