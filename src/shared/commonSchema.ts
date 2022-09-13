import * as mongoose from 'mongoose';

export const modifiedSchema = new mongoose.Schema({
  modifiedBy: { type: String, default: '' },
  modifiedAt: { type: Date, default: Date.now },
});

export const commonSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: false, default: '' },
  modified: [modifiedSchema],
  deletedAt: { type: Date, required: false },
  deletedBy: { type: String, required: false },
});

commonSchema.index({ createdAt: 1 }, { unique: true });
