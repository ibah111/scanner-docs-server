import { GridColumns } from '@mui/x-data-grid-premium';

const TableDocsColumns = (): GridColumns => [
  { field: 'Doc.id', headerName: 'ID', type: 'number' },
  { field: 'Doc.title', headerName: 'title', type: 'string' },
  { field: 'contact_doc_id', headerName: 'contact_doc', type: 'number' },
  { field: 'mail_id', headerName: 'mail', type: 'number' },
  { field: 'law_act_id', headerName: 'law_act', type: 'number' },
  { field: 'law_exec_id', headerName: 'law_exec', type: 'number' },
  { field: 'date', headerName: 'date', type: 'date' },
  {
    field: 'Barcode.Depart.title',
    headerName: 'titleDepart',
    type: 'string',
  },
  { field: 'Barcode.User.f', headerName: 'fio', type: 'string' },
  // {
  //   field: 'Barcode.Transmits.date_send',
  //   headerName: 'date_send',
  //   type: 'date',
  // },
  // {
  //   field: 'Barcode.Transmits',
  //   headerName: 'where_send',
  //   type: 'string',
  // },
];
export default TableDocsColumns;
