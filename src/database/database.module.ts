import { Global, Logger, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        Logger.log('Connecting to Database');
        const MONGO_URL = process.env.MONGO_URL || '';
        const client = await MongoClient.connect(MONGO_URL, {});
        Logger.log('Database Connection Successful');
        let database = client.db(process.env.DATABASE_NAME || '');
        return database;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
