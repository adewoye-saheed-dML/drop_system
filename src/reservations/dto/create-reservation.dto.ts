import {
  IsInt,
  IsUUID,
  Min,
} from 'class-validator';

import { ApiProperty }
from '@nestjs/swagger';

export class CreateReservationDto {

  @ApiProperty({
    example:
      '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}