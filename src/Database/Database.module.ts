import { Module } from '@nestjs/common';
import { ContactDatabase } from './Contact.database';
import LocalDatabase from './Local.database';
import { DocMailDatabase } from './DoMail.database';

@Module({ imports: [ContactDatabase, LocalDatabase, DocMailDatabase] })
export class DatabaseModule {}
