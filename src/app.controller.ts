import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //adding this comment line just for testing purposess
  getHello(): string {
    return this.appService.getHello();
  }
}
