import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    type: String,
  })
  readonly  status: string;

  @ApiProperty({
    type: String,
  })
  readonly  code: string;

  @ApiProperty({
    type: String,
  })
  readonly  message: string;
}