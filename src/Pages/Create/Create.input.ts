import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInput {
  @IsNumber()
  user: number;
  @IsNumber()
  @IsOptional()
  doc_id: number;
  @IsString()
  title: string;
  @IsNumber()
  @IsOptional()
  law_act?: number;
  @IsNumber()
  @IsOptional()
  law_exec?: number;
  @IsNumber()
  depart: number;
}
