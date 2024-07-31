import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteBarcodeInput {
  @IsNumber()
  @ApiProperty({
    description: 'ID входящей почты',
  })
  incoming_id: number;
  @IsString()
  @ApiProperty({
    description: 'Баркод',
  })
  barcode: string;
}
