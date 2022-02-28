import { Controller, Get } from '@nestjs/common';
import { BusPosition } from '@gnosys/interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Promise<Array<BusPosition>> {
    return this.appService.busPosition();
  }
}
