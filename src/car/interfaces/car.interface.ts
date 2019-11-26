import { Document } from 'mongoose';
import { Manufacturer} from "./../../Manufacturer/interfaces/Manufacturer.interface"
import {Owner} from "./../../owner/interfaces/owner.interface"

export interface Car extends Document {
    price: Number;
    firstRegistrationDate: Date;
    manufacturer: Manufacturer;
    owners: [Owner];
}