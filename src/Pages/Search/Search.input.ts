import { IsString } from 'class-validator';

export class SearchInput {
  @IsString()
  code: string;
}
