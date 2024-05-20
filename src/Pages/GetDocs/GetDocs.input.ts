import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { ApiProperty } from '@nestjs/swagger';

export class GetDocsInput {
  @ApiProperty({
    default: {
      items: [],
    },
  })
  filterModel: GridFilterModel;
  @ApiProperty({
    default: [],
  })
  sortModel: GridSortModel;
  @ApiProperty({
    default: {
      page: 0,
      pageSize: 25,
    },
  })
  paginationModel: GridPaginationModel;
}
