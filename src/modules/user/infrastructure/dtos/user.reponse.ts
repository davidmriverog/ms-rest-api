import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponse  {
  @ApiProperty({
    type: Number,
  })
  @Expose()
  readonly id: number;

  @ApiProperty({
    type: String,
  })
  @Expose()
  readonly username: string;

  @ApiProperty({
    type: String,
  })
  @Expose()
  readonly userHash: string;

  @ApiProperty({
    type: Date,
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  @Expose()
  readonly updatedAt: Date;

  @ApiProperty({
    type: Date,
  })
  @Exclude()
  readonly deletedAt: Date;
}