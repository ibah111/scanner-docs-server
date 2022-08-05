import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { GetDocsInput } from './GetDocs.input';
import { Op } from '@contact/sequelize';

@Injectable()
export class GetDocsService {
  constructor(@InjectModel(Doc) private modelDoc: typeof Doc) {}
  async find(body: GetDocsInput): Promise<Doc[]> {
    if (
      body.title != null &&
      body.contact_doc_id != null &&
      body.law_act_id != null
    ) {
      return await this.modelDoc.findAll({
        where: {
          title: { [Op.substring]: body.title },
          contact_doc_id: { [Op.eq]: body.contact_doc_id },
          law_act_id: { [Op.eq]: body.law_act_id },
        },
      });
    } else if (body.title != null && body.contact_doc_id != null) {
      return await this.modelDoc.findAll({
        where: {
          title: { [Op.substring]: body.title },
          contact_doc_id: { [Op.eq]: body.contact_doc_id },
        },
      });
    } else if (body.title != null && body.law_act_id != null) {
      return await this.modelDoc.findAll({
        where: {
          title: { [Op.substring]: body.title },
          law_act_id: { [Op.eq]: body.law_act_id },
        },
      });
    } else if (body.contact_doc_id != null && body.law_act_id != null) {
      return await this.modelDoc.findAll({
        where: {
          contact_doc_id: { [Op.eq]: body.contact_doc_id },
          law_act_id: { [Op.eq]: body.law_act_id },
        },
      });
    } else if (body.title != null) {
      return await this.modelDoc.findAll({
        where: { title: { [Op.substring]: body.title } },
      });
    } else if (body.contact_doc_id != null) {
      return await this.modelDoc.findAll({
        where: { contact_doc_id: { [Op.eq]: body.contact_doc_id } },
      });
    } else if (body.law_act_id != null) {
      return await this.modelDoc.findAll({
        where: { law_act_id: { [Op.eq]: body.law_act_id } },
      });
    } else if (body.law_exec_id != null) {
      return await this.modelDoc.findAll({
        where: { law_exec_id: { [Op.eq]: body.law_exec_id } },
      });
    } else {
      return await this.modelDoc.findAll();
    }
  }
}
