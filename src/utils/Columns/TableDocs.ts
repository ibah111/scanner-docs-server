import { GridColumns } from '@mui/x-data-grid-premium';

const TableDocsColumns = (): GridColumns => [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'title', headerName: 'title', type: 'string' },
  { field: 'contact_doc_id', headerName: 'contact_doc', type: 'number' },
  { field: 'mail_id', headerName: 'mail', type: 'number' },
  { field: 'law_act_id', headerName: 'law_act', type: 'number' },
  { field: 'law_exec_id', headerName: 'law_exec', type: 'number' },
  { field: 'date', headerName: 'date', type: 'date' },
];
export default TableDocsColumns;
