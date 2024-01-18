import { Arhive_DocMail } from './Arhive_DocMail.model';
import { Doc_DocMail } from './Doc_DocMail.model';
import { Logging_DocMail } from './Logging_DocMail.model';
import { Incoming_DocMail } from './Incoming_DocMail.model';
import { User_DocMail } from './User_DocMail.model';
import { User_Role_DocMail } from './User_Role_DocMail.model';
import { Role_DocMail } from './Role_DocMail.model';

export const docModels = [
  Logging_DocMail,
  Incoming_DocMail,
  User_DocMail,
  User_Role_DocMail,
  Role_DocMail,
  Doc_DocMail,
  Arhive_DocMail,
];
