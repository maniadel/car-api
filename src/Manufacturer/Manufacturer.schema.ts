
import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phone: { type: String, required: false },
  siret: { type: String, required: false }
});
