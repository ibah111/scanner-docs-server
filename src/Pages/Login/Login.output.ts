import { AuthUserSuccess } from '../../Modules/Guards/auth.guard';

export class LoginOutput extends AuthUserSuccess {
  local_id: number;
}
