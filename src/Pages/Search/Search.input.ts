import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchInput {
  @IsString()
  code: string;
}
