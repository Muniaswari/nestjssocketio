import * as mongoose from 'mongoose';

export const addressModel = new mongoose.Schema({
  address: { type: String, required: true },
  street: { type: String, required: false, default: '' },
  city: { type: String, required: false, default: '' },
  state: { type: String, required: false, default: '' },
  country: { type: String, required: false, default: '' },
  zipCode: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
});
