import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {HealthCheckModule} from './modules/health-check/health-check.module';
import {DatabaseModule} from './modules/database/database.module';
import {AuthModule} from './modules/auth/auth.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017'), HealthCheckModule, DatabaseModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
