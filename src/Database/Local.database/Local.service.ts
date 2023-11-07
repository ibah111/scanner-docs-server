import { InjectConnection, InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Depart } from './models/Depart.model';
import { Status } from './models/Status.model';
import { User } from './models/User.model';
import axios from 'axios';
import { Sequelize } from '@sql-tools/sequelize-typescript';
import translit from 'src/utils/translit';
import { Role } from './models/Role.model';
import { User_Role } from './models/User_Role.model';
import { BarcodeTypes } from './models/BarcodeTypes.model';
import { DocTypes } from './models/DocTypes.model';
import { BitrixSchema } from '../Bitrix/Bitrix.schema';
import { UserSchema } from '../Bitrix/User.schema';
import { DepartSchema } from '../Bitrix/Depart.schema';
import bitrix from 'src/utils/bitrix';

@Injectable()
export class LocalService {
  constructor(
    @InjectConnection('local') private readonly sequelize: Sequelize,
    @InjectModel(User, 'local') private readonly modelUser: typeof User,
    @InjectModel(Depart, 'local') private readonly modelDepart: typeof Depart,
    @InjectModel(Status, 'local') private readonly modelStatus: typeof Status,
    @InjectModel(Role, 'local') private readonly modelRole: typeof Role,
    @InjectModel(User_Role, 'local')
    private readonly modelUser_Role: typeof User_Role,
    @InjectModel(BarcodeTypes, 'local')
    private readonly modelBarcodeTypes: typeof BarcodeTypes,
    @InjectModel(DocTypes, 'local')
    private readonly modelDocTypes: typeof DocTypes,
  ) {}
  async init() {
    await this.sequelize.sync();
  }
  async migrate() {
    await this.DepartSync();
    await this.UserSync();
    await this.StatusSeed();
    await this.RoleSeed();
    await this.BarcodeTypesSeed();
    await this.DocTypesSeed();
  }
  async UserSync() {
    const res = (
      await axios.post<BitrixSchema<UserSchema[]>>(
        `${bitrix()}/scripts/structure.php`,
        {
          action: 'user',
          token: bitrix('token_structure'),
        },
      )
    ).data;
    const data = res?.result;
    const tmp: Record<number, number> = {};
    const departs = await this.modelDepart.findAll();
    const users = await this.modelUser.findAll();
    const user_ids = users.map((user) => user.bitrix_id);
    const user_contact_login = data.map((user) => user.login);
    for (const depart of departs) {
      tmp[depart.bitrix_id] = depart.id;
    }
    for (const user of data) {
      if (user_ids.includes(Number(user.id))) {
        const User = users.find((U) => U.bitrix_id === Number(user.id))!;
        User.f = user.f;
        User.i = user.i;
        User.o = user.o;
        if (tmp[user.depart]) User.depart = tmp[user.depart];
        User.login = user.login;
        await User.save();
      } else {
        await this.modelUser.create({
          bitrix_id: user.id,
          f: user.f,
          i: user.i,
          o: user.o,
          login: user.login,
          depart: Number(tmp[user.depart]),
          position: user.position,
        });
      }
    }
    for (const user of users) {
      if (!user_contact_login.includes(user.login)) {
        await user.destroy();
      }
    }
  }
  async DepartSync() {
    const parent_ids: Record<number, number> = {};
    const res = (
      await axios.post<BitrixSchema<DepartSchema[]>>(
        `${bitrix()}/scripts/structure.php`,
        { action: 'depart', token: bitrix('token_structure') },
      )
    ).data;
    const data = res?.result;
    const Departs = await this.modelDepart.findAll();
    const Depart_ids = Departs.map((Depart) => Depart.bitrix_id);
    for (const value of data) {
      if (Depart_ids.includes(Number(value.id))) {
        const instance = Departs.find((D) => D.bitrix_id === Number(value.id))!;
        instance.parent_id = value.parent_id
          ? parent_ids[value.parent_id]
          : null;
        instance.title = value.title;
        await instance.save();
        parent_ids[value.id] = instance.id;
      } else {
        const instance = await this.modelDepart.create({
          parent_id: value.parent_id
            ? Number(parent_ids[value.parent_id])
            : null,
          bitrix_id: value.id,
          name: translit(value.title),
          title: value.title,
        });
        parent_ids[value.id] = instance.id;
      }
    }
  }
  async RoleSeed() {
    const Roles = await this.modelRole.findAll();
    const roles = [
      {
        name: 'admin',
        title: 'Администратор',
      },
      {
        name: 'sender',
        title: 'Отправщик',
      },
      {
        name: 'viewer_logs',
        title: 'Просмотрщик логов',
      },
      {
        name: 'former_box',
        title: 'Формировщик коробки',
      },
    ];
    if (Roles.length === 0) {
      const role_admin = await this.modelRole.create(roles[0]);
      for (let i = 1; i < roles.length; i++)
        await this.modelRole.create(roles[i]);
      const [user] = await this.modelUser.findOrCreate({
        where: { login: 'smorkalov@zakon43.ru' },
      });
      await this.modelUser_Role.create({
        user_id: user.id,
        role_id: role_admin.id,
      });
    } else {
      if (Roles.length !== roles.length) {
        const roled = Roles.map((value) => value.name);
        for (const role of roles) {
          if (!roled.includes(role.name)) await this.modelRole.create(role);
        }
      }
    }
  }

  async StatusSeed() {
    if ((await this.modelStatus.count()) === 0) {
      await this.modelStatus.create({
        name: 'Forming',
        title: 'Формирование',
      });
      await this.modelStatus.create({
        name: 'Working',
        title: 'В работе',
      });
      await this.modelStatus.create({
        name: 'Sending',
        title: 'Отправление',
      });
      await this.modelStatus.create({
        name: 'Returning',
        title: 'Возврат',
      });
    }
  }

  async BarcodeTypesSeed() {
    if ((await this.modelBarcodeTypes.count()) === 0) {
      await this.modelBarcodeTypes.create({
        name: 'Doc',
        title: 'Документ',
      });
      await this.modelBarcodeTypes.create({
        name: 'Box',
        title: 'Короб',
      });
    }
  }

  async DocTypesSeed() {
    if ((await this.modelDocTypes.count()) === 0) {
      await this.modelDocTypes.create({
        name: 'writ of execution',
        title: 'Исполнительный лист',
      });
      await this.modelDocTypes.create({
        name: 'court order',
        title: 'Судебный приказ',
      });
    }
  }
}
