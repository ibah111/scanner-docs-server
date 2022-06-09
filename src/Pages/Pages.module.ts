import { Module } from '@nestjs/common';
import { TestModule } from './Test/Test.module';

@Module({ imports: [TestModule] })
export class PagesModule {}
