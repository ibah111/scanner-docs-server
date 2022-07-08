import { Module } from '@nestjs/common';
import { CreateModule } from './Create/Create.module';
import { DataModule } from './Data/Data.module';
import { SearchModule } from './Search/Search.module';
import { SendModule } from './Send/Send.module';
import { TestModule } from './Test/Test.module';

@Module({
  imports: [TestModule, CreateModule, SearchModule, DataModule, SendModule],
})
export class PagesModule {}
