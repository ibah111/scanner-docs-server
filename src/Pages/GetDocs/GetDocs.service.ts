import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { GetDocsInput } from './GetDocs.input';
import { Op } from '@contact/sequelize';

@Injectable()
export class GetDocsService {
  constructor(@InjectModel(Doc) private modelDoc: typeof Doc) {}
  async find(body: GetDocsInput) {
    let limit = body.pageSize;
    let offset = 0 + (body.page - 1) * limit;
    if (
      body.title != null ||
      body.contact_doc_id != null ||
      body.law_act_id != null
    ) {
      return await this.modelDoc.findAndCountAll({
        where: {
          [Op.or]: [
            { title: { [Op.substring]: body.title } },
            { contact_doc_id: { [Op.eq]: body.contact_doc_id } },
            { law_act_id: { [Op.eq]: body.law_act_id } },
          ],
        },
        offset: offset,
        limit: limit,
      });
    } else {
      return await this.modelDoc.findAndCountAll({
        offset: offset,
        limit: limit,
      });
    }
  }
}
