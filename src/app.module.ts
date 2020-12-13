import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { InitializerModule } from './modules/initializer/initializer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/banca'),
    HealthCheckModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    InitializerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
