import { Module } from '@nestjs/common';
import { LoginModule } from './Login/Login.module';
import { CreateModule } from './Create/Create.module';
import { DataModule } from './Data/Data.module';
import { SendModule } from './Send/Send.module';
import { GetDocsModule } from './GetDocs/GetDocs.module';
import { DocumentsModule } from './Documents/Documents.module';
import { OpenHistoryModule } from './OpenHistory/OpenHistory.module';
import { CreateBoxModule } from './CreateBox (deprecated)/CreateBox.module';
import { OpenRowsBoxModule } from './OpenRowsBox/OpenRowsBox.module';
import { UsersModule } from '../Modules/Users/Users.module';
import { TypesModule } from './TypesPage/Types.module';
import { LawPageModule } from './LawPages/LawPage.module';
import { CodesModule } from './Codes/Codes.module';
import { BoxModule } from './Box/Box.module';

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
    OpenRowsBoxModule,
    UsersModule,
    TypesModule,
    LawPageModule,
    CodesModule,
    BoxModule,
  ],
})
export class PagesModule {}
