import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Cat {
  name: string;
  type: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
