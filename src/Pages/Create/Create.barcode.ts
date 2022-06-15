import { IsString } from 'class-validator';

export class CreateBarcode {
  @IsString()
  code: string;
}