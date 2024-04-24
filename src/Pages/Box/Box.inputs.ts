import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class DocumentsToBoxInput {
  @ApiProperty({
    description: 'Number array',
    default: [],
  })
  @IsArray()
  list: number[];

  @ApiProperty({
    description: 'Default first box type input',
    default: 1,
  })
  @IsNumber()
  box_type_id: number;
}

export class DocumentsBoxTypeDeleteInput {
  @ApiProperty({
    description: 'Number array',
  })
  list: number[];
}
