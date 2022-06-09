import { IsNumber } from 'class-validator';

export class TestInput {
  @IsNumber()
  help: number;
}
