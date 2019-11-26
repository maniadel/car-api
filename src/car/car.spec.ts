import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { carSchema } from "./car.schema";
import { CreateCarDto } from "./requests/CreateCarDto";
import { DeleteCarDto } from "./requests/DeleteCarDto";
import { FindByIdCarDto } from "./requests/FindByIdCarDto";

describe("OwnerController", () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    carService = new CarService(carSchema);
    carController = new CarController(carService);
  });

  describe("addNewOwner", () => {
    it("should be defined", () => {
      expect(carService).toBeDefined();
    });

    it("should create Car ", async () => {
      const result: any = {
        statusCode: 201,
        message: "Car successfully created"
      };

      const carTdo: CreateCarDto = {
        firstRegistrationDate: new Date("01-01-2019"),
        price: 3600,
        owners: [{ name: "Mani Adel 1", purchaseDate: new Date("2019-02-11") }],
        manufacturer: {
          name: "Manufacturer 1",
          phone: "0162656434",
          siret: "1222-0000-98776"
        }
      };

      const spy =  jest.spyOn(carService, "addNewCar").mockImplementation(() => result);

      const fct = await carController.createCar(carTdo);
      expect(fct).toBe(result);     
      expect(spy).toBeCalledWith({"firstRegistrationDate": new Date("2018-12-31T23:00:00.000Z"), "manufacturer": {"name": "Manufacturer 1", "phone": "0162656434", "siret": "1222-0000-98776"}, "owners": [{"name": "Mani Adel 1", "purchaseDate": new Date("2019-02-11T00:00:00.000Z") }], "price": 3600});
    });

    it("should delete Car ", async () => {
      const result: any = {
        statusCode: 201,
        message: "Car successfully deleted"
      };

      const carTdo: DeleteCarDto = {
        id: "fake-car-id"
      };

      const spy =  jest.spyOn(carService, "deleteCar").mockImplementation(() => result);

      const fct = await carController.deleteCar(carTdo);
      expect(fct).toBe(result);     
      expect(spy).toBeCalledWith("fake-car-id");
    });

    it("should findbyid Car ", async () => {
      const result: any = {        
        message: "fake-response"
      };

      const carTdo: FindByIdCarDto = {
        id: "fake-car-id"
      };

      const spy =  jest.spyOn(carService, "findCarById").mockImplementation(() => result);

      const fct = await carController.findCarById(carTdo);
      expect(fct).toBe(result);     
      expect(spy).toBeCalledWith({"id": "fake-car-id"});
    });

  });
});
