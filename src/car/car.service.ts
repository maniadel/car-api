import {
  Injectable,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car } from "./interfaces/car.interface";
import { CreateCarDto } from "./requests/CreateCarDto";
import { FindByIdCarDto } from "./requests/FindByIdCarDto";
import { ListCarDto } from "./requests/ListCarDto";
import { UpdateCarDto } from "./requests/UpdateCarDto";

@Injectable()
export class CarService {
  constructor(@InjectModel("Car") private readonly carModel: Model<Car>) {}

  async addNewCar(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = new this.carModel(createCarDto);
    return await newCar.save();
  }

  async deleteCar(id: string) {
    const deleteCar = await this.carModel.deleteOne({ _id: id });
    if (!deleteCar.deletedCount) {
      throw new HttpException(
        "We could not delete Car. Not found",
        HttpStatus.NOT_FOUND
      );
    }
    return {
      message: "Car successfully deleted"
    };
  }

  async findCarById(findByIdCarDto: FindByIdCarDto): Promise<Car> {
    const car = await this.carModel.findById(findByIdCarDto.id);
    if (!car) {
      throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
    }
    return car;
  }

  async listCars(listCarDto: ListCarDto): Promise<any> {
    const limit = Number(listCarDto.limit) || 10;
    const offset = Number(listCarDto.offset) || 0;

    // can be substituted by aggregate
    const result = await this.carModel
      .find({})
      .limit(limit)
      .skip(offset);
    const count = await this.carModel.countDocuments();

    return { count, result };
  }

  async updateCar(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const carDoc = await this.carModel.findById(id);
    if (!carDoc) {
      throw new HttpException(
        "You can not update a Car. Not Found",
        HttpStatus.NOT_FOUND
      );
    }
    await carDoc.updateOne(updateCarDto);
    return this.carModel.findById(id);
  }

  async fetchManufacturer(id: string): Promise<Car> {
    const manufacturer = await this.carModel.findOne({ _id: id }, { manufacturer: 1 } );

    if (!manufacturer) {
      throw new HttpException(
        "Car Id does not exist",
        HttpStatus.NOT_FOUND
      );
    }
    return manufacturer;
  }

  async automaticCarUpdate() {
    // remove the owners who bought their cars before the last 18 months = 46656000000

    await this.carModel.updateMany(
      {
        firstRegistrationDate: {
          $gte: new Date(Date.now() - 46656000000), // 18 months
          $lte: new Date(Date.now() - 31557600000) // 12 months
        }
      },
      { $mul: { price: Number("0.8") } },
      { multi: true }
    );

    await this.carModel.updateMany(
        {},
        {
            $pull: {
                owners: {
                   purchaseDate: { $lte:  new Date(Date.now() - 46656000000) }
                }
            }
        },
        { multi: true }
    );

    return {
        message: "Automatic update finished with success"
    }

  }
}