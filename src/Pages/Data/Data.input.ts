import { IsString } from 'class-validator';

export class DataInput {
  @IsString()
  code: string;
  @IsString()
  token: string;
}
