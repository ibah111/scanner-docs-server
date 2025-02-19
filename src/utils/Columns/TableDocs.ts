import { GridColDefExtend } from '../GridColDefExtndsClass';
/**
 * @todo переписать
 * @returns
 */
export const TableDocsColumns = (): GridColDefExtend[] => [
  {
    type: 'number',
    modelName: 'Doc',
    field: 'id',
    sortCol: 'id',
    filterCol: 'id',
  },
  {
    type: 'string',
    modelName: 'Docs',
    field: 'title',
    sortCol: 'title',
    filterCol: 'Doc.title',
  },
  {
    type: 'number',
    field: 'BoxType.title',
    modelName: 'Barcodes',
    sortCol: 'box_type_id',
    filterCol: 'box_type_id',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'contact_doc_id',
    sortCol: 'contact_doc_id',
    filterCol: 'Doc.contact_doc_id',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'mail_id',
    sortCol: 'mail_id',
    filterCol: 'Doc.mail_id',
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
  {
    type: 'number',
    modelName: 'Docs',
    field: 'law_case_id',
    sortCol: 'law_case_id',
    filterCol: 'law_case_id',
  },
  {
    type: 'date',
    modelName: 'Docs',
    field: 'date',
    sortCol: 'date',
    filterCol: 'date',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'box_id',
    sortCol: 'box_id',
    filterCol: 'box_id',
  },
  {
    type: 'number',
    modelName: 'Docs',
    field: 'doc_type',
    sortCol: 'doc_type',
    filterCol: 'doc_type',
  },
  {
    type: 'number',
    modelName: 'DocData',
    field: 'parent_id',
    sortCol: 'parent_id',
    filterCol: 'parent_id',
  },
  {
    type: 'number',
    modelName: 'DocData',
    field: 'status',
    sortCol: 'status',
    filterCol: 'status',
  },
  {
    type: 'number',
    modelName: 'DocData',
    field: 'user',
    sortCol: 'user',
    filterCol: 'user',
  },
  {
    type: 'number',
    modelName: 'DocData',
    field: 'depart',
    sortCol: 'depart',
    filterCol: 'depart',
  },
  {
    type: 'number',
    modelName: 'Transmits',
    field: 'active',
    sortCol: 'active',
    filterCol: 'active',
  },
  {
    type: 'number',
    modelName: 'Transmits',
    field: 'doc_data_id',
    sortCol: 'doc_data_id',
    filterCol: 'doc_data_id',
  },
  {
    type: 'number',
    modelName: 'Transmits',
    field: 'sender',
    sortCol: 'sender',
    filterCol: 'sender',
  },
  {
    type: 'date',
    modelName: 'Transmit',
    field: 'date_send',
    sortCol: 'date_send',
    filterCol: 'date_send',
  },
  {
    type: 'string',
    modelName: 'Transmit',
    field: 'where_send',
    sortCol: 'where_send',
    filterCol: 'where_send',
  },
  {
    type: 'date',
    modelName: 'Transmit',
    field: 'date_return',
    sortCol: 'date_return',
    filterCol: 'date_return',
  },
  {
    type: 'string',
    modelName: 'Barcodes',
    field: 'code',
    sortCol: 'code',
    filterCol: 'code',
  },
  {
    type: 'string',
    modelName: 'Result',
    field: 'kd',
    sortCol: 'kd',
    filterCol: 'kd',
  },
  {
    type: 'string',
    modelName: 'Result',
    field: 'st_pnkt',
    sortCol: 'st_pnkt',
    filterCol: 'st_pnkt',
  },
  {
    type: 'string',
    modelName: 'Result',
    field: 'reestr',
    sortCol: 'reestr',
    filterCol: 'reestr',
  },
  {
    type: 'string',
    modelName: 'Result',
    field: 'fio_dol',
    sortCol: 'fio_dol',
    filterCol: 'fio_dol',
  },
  {
    type: 'date',
    modelName: 'Result',
    field: 'date_post',
    sortCol: 'date_post',
    filterCol: 'date_post',
  },
];
