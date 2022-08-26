import { IsNumber } from 'class-validator';

export class OpenHistoryInput {
  @IsNumber()
  code: number;
}
