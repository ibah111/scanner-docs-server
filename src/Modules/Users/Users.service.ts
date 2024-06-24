import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from 'src/Database/Local.database/models/User.model';
import { Department } from '@contact/models';
import { AuthUser } from '../Guards/auth.guard';
import axios from 'axios';
import { BitrixSchema } from '../../Database/Bitrix/Bitrix.schema';
import { DepartSchema } from '../../Database/Bitrix/Depart.schema';
import bitrix from '../../utils/bitrix';
import { Depart } from '../../Database/Local.database/models/Depart.model';
import { UserSchema } from '../../Database/Bitrix/User.schema';
import translit from '../../utils/translit';
@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User, 'local') private modelUser: typeof User,
    @InjectModel(Department, 'contact')
    private readonly modelDepartment: typeof Department,
    @InjectModel(Depart, 'local')
    private readonly modelDepart: typeof Depart,
  ) {}
  async createUser(user: AuthUser<false>) {
    const dep = await this.modelDepartment.findOne({
      where: {
        name: user.department,
      },
      rejectOnEmpty: new Error('Департамент не найден'),
    });
    return await this.modelUser.create({
      bitrix_id: user.id,
      depart: dep.dep,
      login: user.login,
      position: user.position,
      f: user.secondname,
      i: user.firstname,
      o: user.thirdname,
    });
  }
  async onModuleInit() {
    try {
      await this.DepartSync();
      await this.UserSync();
    } catch (e) {
      console.log(e);
      throw e;
    }
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
        console.log(`user deleted`, user);
        // await user.destroy();
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
}
