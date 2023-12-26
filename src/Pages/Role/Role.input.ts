import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleInputRemoveRole {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  role_id: number;
}

export class RoleInputAddRole {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  role_id: number;
}
export class GetUsersInput {
  @Expose()
  @ApiProperty()
  filterModel: GridFilterModel;
  @Expose()
  @ApiProperty()
  sortModel: GridSortModel;
  @Expose()
  @ApiProperty()
  paginationModel: {
    pageSize: number;
    page: number;
  };
}
