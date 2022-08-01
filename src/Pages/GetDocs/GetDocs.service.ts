import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Log } from 'src/Database/Local.database/models/Log.model';

@Injectable()
export class GetDocsService {
  constructor(@InjectModel(Doc) private modelDoc: typeof Doc) {}
  async findAll(): Promise<Doc[]> {
    return this.modelDoc.findAll({
      limit: 100,
    });
  }
}
