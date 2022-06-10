import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from './models/Barcode.model';
import { Depart } from './models/Depart.model';
import { Doc } from './models/Doc.model';
import { Log } from './models/Log.model';
import { Status } from './models/Status.model';
import { User } from './models/User.model';
import axios from 'axios';
import server from 'src/utils/server';
import { Model } from '@contact/sequelize-typescript';

@Injectable()
export class LocalService {
  constructor(
    @InjectModel(Barcode) private readonly modelBarcode: typeof Barcode,
    @InjectModel(Log) private readonly modelLog: typeof Log,
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(Depart) private readonly modelDepart: typeof Depart,
    @InjectModel(Status) private readonly modelStatus: typeof Status,
    @InjectModel(Doc) private readonly modelDoc: typeof Doc,
  ) {}
  async init() {
    await this.modelBarcode.sync();
    await this.modelLog.sync();
    await this.modelUser.sync();
    await this.modelDepart.sync();
    await this.modelStatus.sync();
    await this.modelDoc.sync();
  }
  async migrate() {
    await this.DepartSync();
    await this.UserSync();
    await this.StatusSync();
  }
  async UserSync() {
    const res = (
      await axios({
        method: 'post',
        url: `${server()}/scripts/structure.php`,
        data: { action: 'user', token: server('token') },
      })
    ).data;
    const data = res?.result;
    const tmp = {};
    const departs = await this.modelDepart.findAll();
    const users = await this.modelUser.findAll();
    const user_ids = users.map((user) => user.bitrix_id);
    for (const depart of departs) {
      tmp[depart.bitrix_id] = depart.id;
    }
    for (const user of data) {
      if (user_ids.includes(Number(user.id))) {
        const User = users.find((U) => U.bitrix_id === Number(user.id));
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
  }
  async DepartSync() {
    const parent_ids: any = {};
    const res = (
      await axios({
        method: 'post',
        url: `${server()}/scripts/structure.php`,
        data: { action: 'depart', token: server('token') },
      })
    ).data;
    const data = res?.result;
    const Departs = await this.modelDepart.findAll();
    const Depart_ids = Departs.map((Depart) => Depart.bitrix_id);
    for (const value of data) {
      if (Depart_ids.includes(Number(value.id))) {
        const instance = Departs.find((D) => D.bitrix_id === Number(value.id));
        instance.parent_id =
          value.parent_id > 0 ? parent_ids[value.parent_id] : null;
        instance.title = value.title;
        await instance.save();
        parent_ids[value.id] = instance.id;
      } else {
        const instance = await this.modelDepart.create({
          parent_id:
            value.parent_id > 0 ? Number(parent_ids[value.parent_id]) : null,
          bitrix_id: value.id,
          title: value.title,
        });
        parent_ids[value.id] = instance.id;
      }
    }
  }
  async StatusSync(){
    await this.modelStatus.create({
      name: 'Expect',
      title: "Ожидает"
    });
    await this.modelStatus.create({
      name: 'Processing',
      title: "Обработка" 
    });
    await this.modelStatus.create({
      name: "Sending",
      title: "Отправка"
    })
  }
}
