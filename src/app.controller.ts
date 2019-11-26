import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @HttpCode(200)
  checkAPIHealth(): any {
    return this.appService.checkAPIHealth();
  }
}
