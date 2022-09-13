import mongoose from 'mongoose';
import { dbconfiguration } from './../shared/constants';

export const databaseProviders = [
  {
    provide: dbconfiguration.dbconnetionString,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        dbconfiguration.dbname,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
          poolSize: 50
        }
      )
  }
];
