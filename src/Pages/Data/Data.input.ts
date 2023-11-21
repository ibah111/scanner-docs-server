import { IsNotEmpty, IsString } from 'class-validator';

export class DataInput {
  @IsNotEmpty()
  @IsString()
  code: string;
}
