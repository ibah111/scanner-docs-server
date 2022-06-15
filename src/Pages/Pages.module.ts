import { Module } from '@nestjs/common';
import { CreateModule } from './Create/Create.module';
import { SearchModule } from './Search/Search.module';
import { TestModule } from './Test/Test.module';

@Module({ imports: [TestModule, CreateModule, SearchModule] })
export class PagesModule {}
