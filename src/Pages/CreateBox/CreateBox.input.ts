import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';

export class CreateBoxInput {
  @IsNotEmpty()
  @IsBoolean()
  create: boolean;
  codes: [Barcode];
}
