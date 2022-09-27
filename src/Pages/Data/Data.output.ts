import { DepartAttributes } from 'src/Database/Local.database/models/Depart.model';
import { DocAttributes } from 'src/Database/Local.database/models/Doc.model';
import { DocDataAttributes } from 'src/Database/Local.database/models/DocData.model';
import { UserAttributes } from 'src/Database/Local.database/models/User.model';

export interface ResultData extends DocDataAttributes {
  UserOld: UserAttributes;
  DepartOld: DepartAttributes;
}
export interface Results extends DocAttributes {
  DocData: ResultData;
}
