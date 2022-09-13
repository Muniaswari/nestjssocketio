import * as mongoose from 'mongoose';

export const referenceFormDetialsModel = new mongoose.Schema({
  primaryColumnName: { type: String, required: true },
  childFormName: { type: String, required: true, default: '' },
  foreignColumnName: { type: String, required: true, default: '' },
});