import {
  Controller,
  Post,
  Body,
  HttpCode,  
  Delete,
  Get,
  Param,  
  Query,
  Put
} from "@nestjs/common";
import { CarService } from "./car.service";
import { Car } from "./interfaces/car.interface";
import { CreateCarDto } from "./requests/CreateCarDto";
import { DeleteCarDto } from "./requests/DeleteCarDto";
import { FindByIdCarDto } from "./requests/FindByIdCarDto";
import { ListCarDto } from "./requests/ListCarDto";
import { UpdateCarDto } from "./requests/UpdateCarDto";


@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Post("/create")
  @HttpCode(201)
  async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.addNewCar(createCarDto);
  }

  @Delete('/delete')
  @HttpCode(200)
  deleteCar(@Body() deleteCarDto: DeleteCarDto) {
    return this.carService.deleteCar(deleteCarDto.id);
  }

  @Get('/findbyid/:id')
  @HttpCode(200)
  findCarById(@Param() findByIdCarDto: FindByIdCarDto): Promise<Car> {
    return this.carService.findCarById(findByIdCarDto)
  }

  @Get('/list')
  @HttpCode(200)
  listCar(@Query() listCarDto: ListCarDto): Promise<any> {
    return this.carService.listCars(listCarDto)
  }

  @Put('/update/:id')
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto): Promise<Car> {
    return this.carService.updateCar(id, updateCarDto);
  }

  @Get('/fetch-manufacturer/:id')
  @HttpCode(200)
  fetchManufacturer(@Param('id') id: string): Promise<any> {
    return this.carService.fetchManufacturer(id)
  }

  @Get('/automatic-car-update')
  @HttpCode(200)
  automaticCarUpdate() {
    return this.carService.automaticCarUpdate()
  }
}