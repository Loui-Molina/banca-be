import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HealthCheck, HealthCheckResult, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
@UseGuards(AuthGuard())
export class HealthController {
    constructor(
        private readonly healthCheck: HealthCheckService,
        private readonly mongooseHealth: MongooseHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.healthCheck.check([() => this.mongooseHealth.pingCheck('mongoDB')]);
    }
}
