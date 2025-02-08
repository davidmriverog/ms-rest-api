import { ApiProperty } from '@nestjs/swagger';

export class UserResponse  {
  @ApiProperty({
    type: Number,
  })
  readonly id: number;

  @ApiProperty({
    type: String,
  })
  readonly username: string;

  @ApiProperty({
    type: String,
  })
  readonly userHash: string;

  @ApiProperty({
    type: Date,
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  readonly updatedAt: Date;
}