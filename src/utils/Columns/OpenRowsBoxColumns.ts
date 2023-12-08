import { GridColDefExtend } from '../GridColDefExtndsClass';

export const OpenRowsBoxColumns = (): GridColDefExtend[] => [
  {
    type: 'number',
    modelName: 'Docs',
    field: 'id',
    sortCol: 'id',
    filterCol: 'id',
  },
  {
    type: 'number',
    modelName: 'Barcodes',
    field: 'code',
    sortCol: 'code',
    filterCol: 'code',
  },
  {
    type: 'number',
    modelName: 'Doc',
    field: 'contact_doc_id',
    sortCol: 'contact_doc_id',
    filterCol: 'contact_doc_id',
  },
  {
    type: 'string',
    modelName: 'DocData.Result',
    field: 'kd',
    sortCol: 'kd',
    filterCol: 'kd',
  },
  {
    type: 'string',
    modelName: 'DocData.Result',
    field: 'fio_dol',
    sortCol: 'fio_dol',
    filterCol: 'fio_dol',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'title',
    sortCol: 'title',
    filterCol: 'title',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'law_act_id',
    sortCol: 'law_act_id',
    filterCol: 'law_act_id',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'law_exec_id',
    sortCol: 'law_exec_id',
    filterCol: 'law_exec_id',
  },
];
