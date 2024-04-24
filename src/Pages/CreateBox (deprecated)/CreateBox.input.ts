import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoxInput {
  @Expose()
  @IsArray()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  @IsNotEmpty()
  @ApiProperty({ type: [Number] })
  list: number[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  boxTitle: string;
}
