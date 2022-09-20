import { GridColumns } from '@mui/x-data-grid-premium';

const TableDocsColumns = (): GridColumns => [
  { field: 'Doc.id', headerName: 'ID', type: 'number' },
  { field: 'Doc.title', headerName: 'Название документа', type: 'string' },
  { field: 'contact_doc_id', headerName: 'Номер документа', type: 'number' },
  { field: 'mail_id', headerName: 'mail', type: 'number' },
  { field: 'law_act_id', headerName: 'Юридическое дело', type: 'number' },
  { field: 'law_exec_id', headerName: 'Исполнительное дело', type: 'number' },
  { field: 'date', headerName: 'date', type: 'date' },
  {
    field: 'DocData.Depart.title',
    headerName: 'Подразделение',
    type: 'string',
  },
  {
    field: 'DocData.User.f',
    headerName: 'Текущий держатель',
    type: 'string',
  },
  {
    field: 'DocData.Transmits.date_send',
    headerName: 'Дата отправки в банк/ОСП',
    type: 'date',
  },
  {
    field: 'DocData.Transmits.where_send',
    headerName: 'Куда отправлено',
    type: 'string',
  },
  { field: 'Barcode.code', headerName: 'Номер штрихкода', type: 'sting' },
  {
    field: 'DocData.Result.fio_dol',
    headerName: 'ФИО должника',
    type: 'string',
  },
  { field: 'DocData.Result.reestr', headerName: 'Реестр', type: 'string' },
  {
    field: 'DocData.Result.kd',
    headerName: 'Кредитный договор',
    type: 'string',
  },
];
export default TableDocsColumns;
