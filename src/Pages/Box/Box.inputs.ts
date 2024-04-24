import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AddDocumentToBoxInput {
  @ApiProperty({
    description: '',
    default: [],
  })
  @IsArray()
  list: number[];

  @ApiProperty({
    description: '',
    default: 1,
  })
  @IsNumber()
  box_type: number;
}
