import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(private healthCheck: HealthCheckService, private mongooseHealth: MongooseHealthIndicator) {}

    @Get()
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.healthCheck.check([() => this.mongooseHealth.pingCheck('mongoDB')]);
    }
}
