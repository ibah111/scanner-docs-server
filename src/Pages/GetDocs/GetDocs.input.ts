import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetDocsInput {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  contact_doc_id: number;

  @IsNumber()
  @IsOptional()
  mail_id: number;

  @IsNumber()
  @IsOptional()
  law_act_id: number;

  @IsNumber()
  @IsOptional()
  law_exec_id: number;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;
}
