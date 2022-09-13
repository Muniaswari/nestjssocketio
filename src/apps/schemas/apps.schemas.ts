import * as mongoose from 'mongoose';
import { commonSchema } from '../../shared/commonSchema';
import { v4 as uuidv4 } from 'uuid';
import { Apps } from '../interfaces/apps.interface';

export const appsSchema = new mongoose.Schema({
  appId: { type: String },
  appName: { type: String, required: true },
  appType: { type: String, default: 'Application' },
  tenantId: { type: String, required: true, default: '' },
  isPublic: { type: Boolean, default: false },
  isMenuRequired: { type: Boolean, default: true },
  isApiIntegrator: { type: Boolean, default: false },
  description: { type: String, required: false, default: '' },
  homepage: { type: String, required: false, default: '' },
  publicpage: { type: String, required: false, default: '' },
  ...commonSchema.obj,
});

appsSchema.index({ appId: 1, appName: 1 }, { unique: true });

// appsSchema.pre<Apps>('save', async function (next: Function) {
//   var metadata_data = this;
//   metadata_data.set({ appId: await uuidv4() }); // Generate UUID for new record
//   next();
// });