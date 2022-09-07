import { IsBoolean, IsNotEmpty } from 'class-validator';
import { DocData } from 'src/Database/Local.database/models/DocData.model';

export class CreateBoxInput {
  @IsNotEmpty()
  @IsBoolean()
  create: boolean;
  codes: [DocData];
}
