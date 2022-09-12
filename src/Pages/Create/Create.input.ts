import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInput {
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
  @ApiPropertyOptional({
    description:
      'Вводим номер судебного иска/приказа (необязательный параметр)',
    type: Number,
  })
  law_act?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Вводим номер исполнительного документа (необязательный параметр)',
    type: Number,
  })
  law_exec?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Вводим тип документа 1 - Исполнительный лист, 2 - Судебный приказ',
    type: Number,
  })
  type: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Токен пользователя', type: String })
  token: string;
}
