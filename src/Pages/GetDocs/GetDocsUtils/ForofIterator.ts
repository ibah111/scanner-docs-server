import { LawAct, LawExec } from '@contact/models';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Result } from 'src/Database/Local.database/models/Result.model';

export const forOfIterator = async (
  doc: Doc,
  data_result: Result[],
  model: LawAct | LawExec,
) => {
  for (const res of data_result) {
    if (doc.DocData!.result == res.id) {
      res.kd = model.Debt!.contract;
      res.reestr = model.Portfolio!.name;
      res.fio_dol =
        model.Person!.f + ' ' + model.Person!.i + ' ' + model.Person!.o;
      res.date_post = model!.Portfolio!.load_dt;
      await res.save();
    }
  }
};
