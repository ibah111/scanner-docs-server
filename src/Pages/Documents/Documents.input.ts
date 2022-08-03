import { IsNotEmpty, IsNumber } from 'class-validator';

export class DocumentsInput {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
