import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  @Get('app') appHealthCheck() {
    return 'App OK';
  }

  @Get('mongo') mongoHealthCheck() {
    return 'Mongo OK'; //TODO ACTUALLY CHECK MONGO CONNECTION
  }
}
