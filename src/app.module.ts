import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import {Connection} from './conf/connection';
import { CarModule } from './car/car.module';


@Module({
  imports: [Connection, CarModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
