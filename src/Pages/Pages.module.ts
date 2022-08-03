import { Module } from '@nestjs/common';
import { LoginModule } from './Login/Login.module';
import { CreateModule } from './Create/Create.module';
import { DataModule } from './Data/Data.module';
import { SearchModule } from './Search/Search.module';
import { SendModule } from './Send/Send.module';
import { GetDocsModule } from './GetDocs/GetDocs.module';
import { DocumentsModule } from './Documents/Documents.module';

@Module({
  imports: [
    CreateModule,
    SearchModule,
    DataModule,
    SendModule,
    LoginModule,
    GetDocsModule,
    DocumentsModule,
  ],
})
export class PagesModule {}
