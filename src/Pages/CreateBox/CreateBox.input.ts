import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateBoxInput {
  @IsNotEmpty()
  @IsBoolean()
  create: boolean;
}
