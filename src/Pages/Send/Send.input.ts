import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class SendInput {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  DateSend: Date;
  @IsString()
  @IsNotEmpty()
  WhereSend: string;
}
