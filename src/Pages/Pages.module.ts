import { Module } from '@nestjs/common';
import { LoginModule } from './Login/Login.module';
import { CreateModule } from './Create/Create.module';
import { DataModule } from './Data/Data.module';
import { SendModule } from './Send/Send.module';
import { GetDocsModule } from './GetDocs/GetDocs.module';
import { DocumentsModule } from './Documents/Documents.module';
import { OpenHistoryModule } from './OpenHistory/OpenHistory.module';
import { CreateBoxModule } from './CreateBox/CreateBox.module';

@Module({
  imports: [
    CreateModule,
    DataModule,
    SendModule,
    LoginModule,
    GetDocsModule,
    DocumentsModule,
    OpenHistoryModule,
    CreateBoxModule,
  ],
})
export class PagesModule {}
