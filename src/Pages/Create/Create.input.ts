import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Document title',
    description: 'Вводим название документа',
    type: String,
  })
  @Expose()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    default: 3980242,
    description: 'Вводим id документа из ДО',
    type: Number,
  })
  @Expose()
  contact_doc_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    default: 1702861,
    description: 'Вводим id письма из входящей почты',
    type: Number,
  })
  @Expose()
  mail_id: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    default: 518449,
    description:
      'Вводим номер судебного иска/приказа (необязательный параметр) ===> Верхнее поле в DocAdder',
    type: Number,
  })
  @Expose()
  law_act_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    default: 0,
    description:
      'Вводим номер исполнительного документа (необязательный параметр) нижнее поле в DocAdder',
    type: Number,
  })
  @Expose()
  law_exec_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    default: 2,
    description:
      'Вводим тип документа 1 - Исполнительный лист, 2 - Судебный приказ',
    type: Number,
  })
  @Expose()
  doc_type: number;
}
