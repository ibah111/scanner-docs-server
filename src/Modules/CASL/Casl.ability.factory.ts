import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
  createMongoAbility,
} from '@casl/ability';
import { Barcode } from '../../Database/Local.database/models/Barcode.model';

import { User_Role } from '../../Database/Local.database/models/User_Role.model';
import { Role } from '../../Database/Local.database/models/Role.model';
import { BarcodeTypes } from '../../Database/Local.database/models/BarcodeTypes.model';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { Depart } from '../../Database/Local.database/models/Depart.model';
import { Doc } from '../../Database/Local.database/models/Doc.model';
import { DocData } from '../../Database/Local.database/models/DocData.model';
import { Log } from '../../Database/Local.database/models/Log.model';
import { Transmit } from '../../Database/Local.database/models/Transmit.model';
import { Result } from '../../Schemas/Result.model';
import { DocTypes } from '../../Database/Local.database/models/DocTypes.model';
import { Injectable } from '@nestjs/common';
import { User } from '../../Database/Local.database/models/User.model';

export enum Actions {
  manage = 'manage',
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}
type Subjects =
  | InferSubjects<
      | typeof User
      | typeof User_Role
      | typeof Role
      | typeof Barcode
      | typeof BarcodeTypes
      | typeof Depart
      | typeof Doc
      | typeof DocData
      | typeof DocTypes
      | typeof Log
      | typeof Result
      | typeof Status
      | typeof Transmit
    >
  | 'all';

export type AppAbility = PureAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  /**
   * @todo при необходимости убрать null у User
   */
  createForUser(user: User | null) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
    const roles = user?.Roles?.map((i) => i.name);
    if (roles?.includes('admin')) {
      can(Actions.manage, 'all');
    }
    /**
     * дописать для остальных
     */
    return build({
      detectSubjectType(subject) {
        return subject.constructor as ExtractSubjectType<Subjects>;
      },
    });
  }
}
