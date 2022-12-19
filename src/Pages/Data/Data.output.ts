import { Attributes } from '@contact/sequelize';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { User } from 'src/Database/Local.database/models/User.model';

export interface ResultData extends Attributes<DocData> {
  UserOld: Attributes<User>;
  DepartOld: Attributes<Depart>;
}
export interface Results extends Attributes<Doc> {
  DocData: ResultData;
}
