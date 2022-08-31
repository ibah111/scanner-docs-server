import { GridColumns } from '@mui/x-data-grid-premium';

const TableDocsColumns = (): GridColumns => [
  { field: 'Doc.id', headerName: 'ID', type: 'number' },
  { field: 'Doc.title', headerName: 'Название документа', type: 'string' },
  { field: 'contact_doc_id', headerName: 'Номер документа', type: 'number' },
  { field: 'mail_id', headerName: 'mail', type: 'number' },
  { field: 'law_act_id', headerName: 'law_act', type: 'number' },
  { field: 'law_exec_id', headerName: 'law_exec', type: 'number' },
  { field: 'date', headerName: 'date', type: 'date' },
  {
    field: 'Barcode.Depart.title',
    headerName: 'Подразделение',
    type: 'string',
  },
  { field: 'Barcode.User.f', headerName: 'Текущий держатель', type: 'string' },
  // {
  //   field: 'Barcode.Transmits.date_send',
  //   headerName: 'Дата отправки в банк/ОСП',
  //   type: 'date',
  // },
  // {
  //   field: 'Barcode.Transmits',
  //   headerName: 'Куда отправлено',
  //   type: 'string',
  // },
];
export default TableDocsColumns;
