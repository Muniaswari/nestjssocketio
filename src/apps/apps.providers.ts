import { Connection } from 'mongoose';
import { appsSchema } from './schemas/apps.schemas';
import { dbconfiguration, schemalist, models } from '../shared/constants';

export const appsProviders = [
  {
    provide: schemalist.appsschema,
    useFactory: (connection: Connection) =>
      connection.model(models.appsmodel, appsSchema),
    inject: [dbconfiguration.dbconnetionString],
  },
];
