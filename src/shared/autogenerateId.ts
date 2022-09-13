import { ObjectId } from 'mongodb';

export async function generateId(datamodel) {
  // Only increment when the document is new
  if (datamodel.isNew) {
    return new ObjectId().toHexString();
  }
}

export async function generateIdAll() {
  // Only increment when the document is new
  return new ObjectId().toHexString();
}

