import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoleInputRemoveRole {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
export class RoleInputRemoveUser {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
export class RoleInputAddUser {
  @IsNotEmpty()
  @IsString()
  login: string;
}
export class RoleInputAddRole {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
