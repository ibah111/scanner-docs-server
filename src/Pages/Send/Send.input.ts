import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendInput {
  @ApiProperty({
    description: 'id???',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @ApiProperty({
    description: 'Дата отправления',
    default: new Date(),
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  DateSend: Date;
  @ApiProperty({
    description: 'Куда было отправлено',
    default: 'Суд в который отправляю документ',
  })
  @IsString()
  @IsNotEmpty()
  WhereSend: string;
}
