import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as mongoose from "mongoose";

import { config } from "../src/conf/config";
import { HttpStatus } from "@nestjs/common";
import { CreateManufacturerDto } from "../src/Manufacturer/requests/CreateManufacturerDto";
import { carSchema } from "../src/car/car.schema";
import { CreateCarDto } from "../src/car/requests/CreateCarDto";
import { CreateOwnerDto } from "../src/owner/requests/CreateOwnerDto";
import { DeleteCarDto } from "src/car/requests/DeleteCarDto";

describe("Car  (e2e)", () => {
  let app;
  let carModel;

  beforeAll(async () => {
    await mongoose.connect(config["test"].connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    carModel = mongoose.model("Car", carSchema);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // look for elegant way to get connection and empty db
    await carModel.deleteMany({});
  });

  afterAll(async done => {
    await carModel.deleteMany({});
    await mongoose.disconnect(done);
  });

  it("/ (POST): Create Car", () => {
    const ManufacturerTdo: CreateManufacturerDto = {
      name: "Manufacturer 1",
      phone: "0762656434",
      siret: "1222-0000-98776"
    };

    const owner1Tdo: CreateOwnerDto = {
      name: "Mani",
      purchaseDate: new Date("2019-01-11")
    };

    const carTdo: CreateCarDto = {
      firstRegistrationDate: new Date("2019-01-11"),
      price: 36000,
      manufacturer: ManufacturerTdo,
      owners: [owner1Tdo]
    };

    return request(app.getHttpServer())
      .post("/car/create")
      .send(carTdo)
      .expect(HttpStatus.CREATED);
  });

  it("/ (DELETE): Delete Car", async () => {
    const lastInsertedDoc = await carModel.create({
      firstRegistrationDate: "2019-01-11",
      price: 36000,
      owners: [
        {
          name: "Mani",
          purchaseDate: "2019-01-11"
        }
      ],
      manufacturer: {
        name: "Manufacturer 1",
        phone: "0762656434"
      }
    });
    const tdo: DeleteCarDto = { id: lastInsertedDoc._id };

    return request(app.getHttpServer())
      .delete("/car/delete")
      .send(tdo)
      .expect(HttpStatus.OK)
      .expect({ message: "Car successfully deleted" });
  });

  it("/ (GET): Find Car by id ", async () => {
    const lastInsertedDoc = await carModel.create({
      firstRegistrationDate: "2019-01-11",
      price: 36000,
      owners: [
        {
          name: "Mani",
          purchaseDate: "2019-01-11"
        }
      ],
      manufacturer: {
        name: "Manufacturer 1",
        phone: "0762656434"
      }
    });

    return request(app.getHttpServer())
      .get(`/car/findbyid/${lastInsertedDoc._id}`)
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(lastInsertedDoc));
  });

  it("/ (GET): Car list", () => {
    return request(app.getHttpServer())
      .get("/car/list?limit=5&offset=0")
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty("count");
        expect(body).toHaveProperty("result");
      });
  });

  it("/ (Update): Update Car", async () => {
    const lastInsertedDoc = await carModel.create({
      firstRegistrationDate: "2018-01-11",
      price: 36000,
      owners: [
        {
          name: "Mani Adel",
          purchaseDate: "2019-01-11"
        }
      ],
      manufacturer: {
        name: "Toyota",
        phone: "0762656434"
      }
    });

    //---- New data
    const tdoUpdateCar = {
      firstRegistrationDate: new Date("2019-01-11"),
      price: 25000,
      manufacturer: {
        name: "BMW",
        phone: "0762656434",
        siret: "1222-0000-98776"
      },
      owners: [
        {
          name: "Mani Adel",
          purchaseDate: new Date("2019-01-11")
        },
        {
          name: "Mani Elissa",
          purchaseDate: new Date("2019-01-11")
        }
      ]
    };

    return request(app.getHttpServer())
      .put(`/car/update/${lastInsertedDoc._id}`)
      .send(tdoUpdateCar)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty(
          "firstRegistrationDate",
          tdoUpdateCar.firstRegistrationDate.toISOString()
        );
        expect(body).toHaveProperty("price", tdoUpdateCar.price);
        expect(body).toHaveProperty(
          "manufacturer.name",
          tdoUpdateCar.manufacturer.name
        );
        expect(body).toHaveProperty(
          "manufacturer.phone",
          tdoUpdateCar.manufacturer.phone
        );
        expect(body).toHaveProperty(
          "manufacturer.siret",
          tdoUpdateCar.manufacturer.siret
        );
        expect(body.owners).toHaveLength(2);
      });
  });

  it("/ (GET): Fetch Manufacturer by Car ID ", async () => {
    const lastInsertedDoc = await carModel.create({
      firstRegistrationDate: "2019-01-11",
      price: 36000,
      owners: [
        {
          name: "Mani Adel",
          purchaseDate: "2019-01-11"
        }
      ],
      manufacturer: {
        name: "BMW",
        phone: "0762656434"
      }
    });

    return request(app.getHttpServer())
      .get(`/car/fetch-manufacturer/${lastInsertedDoc._id}`)
      .expect(HttpStatus.OK)
      .expect(
        JSON.stringify({
          _id: lastInsertedDoc._id,
          manufacturer: lastInsertedDoc.manufacturer
        })
      );
  });


  it.only("/ (GET): Automatic Trigger  (remove owners > 18 moths )", async () => {
    // remove Mani Adel 1 / no discount
    const doc1 = await carModel.create({
      firstRegistrationDate: "2010-01-11",
      price: 36000,
      owners: [
        { name: "Mani Adel 1", purchaseDate: "2010-01-11" },
        { name: "Mani Adel 2", purchaseDate: "2019-01-11" }
      ],
      manufacturer: { name: "BMW", phone: "0762656434" }
    });
    // remove Mani Elissa 1 and apply discount 20%
    const doc2 = await carModel.create({
      firstRegistrationDate: "2018-07-11",
      price: 20000,
      owners: [
        { name: "Mani Elissa 1", purchaseDate: "2010-01-11" },
        { name: "Mani Elissa 2", purchaseDate: "2019-09-11" }],
      manufacturer: { name: "BMW", phone: "0762656434" }
    });

    return request(app.getHttpServer())
      .get(`/car/automatic-car-update`)
      .expect(HttpStatus.OK)
      .expect({ message: "Automatic update finished with success" })
      .then(() => {
        return request(app.getHttpServer())
          .get("/car/list?limit=20&offset=0")
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body).toHaveProperty("count", 2);
            expect(body).toHaveProperty("result");

            const expectedDoc1 = (body.result).filter(data => data._id == doc1._id)[0];
            expect(expectedDoc1).toHaveProperty("price", 36000); // no discount
            expect(expectedDoc1.owners).toHaveLength(1); // check "Mani Adel 1" deleted (owner purchase > 18 months)
            expect(expectedDoc1.owners[0]).toHaveProperty("name", 'Mani Adel 2');

            const expectedDoc2 = (body.result).filter(data => data._id == doc2._id)[0];
            expect(expectedDoc2).toHaveProperty("price", 16000); //  discount of 20% applyied
            expect(expectedDoc2.owners).toHaveLength(1); // check "Mani Adel 1" deleted (owner purchase > 18 months)
            expect(expectedDoc2.owners[0]).toHaveProperty("name", 'Mani Elissa 2');

          });
      })


  });
});
