import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendInput {
  @ApiProperty({
    description: 'id',
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
  })
  @IsString()
  @IsNotEmpty()
  WhereSend: string;

  @ApiProperty({
    description: 'Индетификатор короба',
  })
  @IsNumber()
  BoxTypeId: number;
}
