import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInput {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Вводим id пользователя ДО',
    type: Number,
  })
  user: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Вводим id документа из ДО',
    type: Number,
  })
  doc_id: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Вводим id письма из входящей почты',
    type: Number,
  })
  mail_id: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Вводим название документа',
    type: String,
  })
  title: string;
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:
      'Вводим номер судебного иска/приказа (необязательный параметр)',
    type: Number,
    required: false,
  })
  law_act?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:
      'Вводимм номер исполнительного документа (необязательный параметр)',
    type: Number,
    required: false,
  })
  law_exec?: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Вводим id департамента',
    type: Number,
  })
  depart: number;
}
