import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleInputAddRole {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}

export class RoleInputRemoveRole {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
