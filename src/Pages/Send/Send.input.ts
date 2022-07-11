import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendInput {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  DateSend: Date;
  @IsString()
  @IsNotEmpty()
  WhereSend: string;
}
