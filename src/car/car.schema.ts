
import * as mongoose from 'mongoose';
import {OwnerSchema} from '../owner/owner.schema'
import { ManufacturerSchema } from '../Manufacturer/Manufacturer.schema';

export const carSchema = new mongoose.Schema({
  price: { type: Number, required: false },
  firstRegistrationDate: { type: Date, required: true },
  manufacturer: { type: ManufacturerSchema },
  owners : { type: [OwnerSchema] }
});
