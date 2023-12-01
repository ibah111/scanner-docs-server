import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LawPageInput {
  @Expose()
  @ApiProperty()
  filterModel: GridFilterModel;
  @Expose()
  @ApiProperty()
  sortModel: GridSortModel;
  @Expose()
  @ApiProperty()
  page: number;
  @Expose()
  @ApiProperty()
  pageSize: number;
}
