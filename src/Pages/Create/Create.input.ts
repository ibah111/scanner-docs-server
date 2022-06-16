import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInput {
  @IsNumber()
  user: number;
  @IsNumber()
  doc_id: number;
  @IsNumber()
  mail_id: number;
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
