import { Module } from '@nestjs/common';
import { ContactDatabase } from './Contact.database';
import { LocalDatabase } from './Local.database';

@Module({ imports: [ContactDatabase, LocalDatabase] })
export class DatabaseModule {}
