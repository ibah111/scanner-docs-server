import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleInputRemoveRole {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class RoleInputAddRole {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
