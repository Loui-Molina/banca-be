import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {HealthCheckModule} from './modules/health-check/health-check.module';
import {DatabaseModule} from './modules/database/database.module';
import {AuthModule} from './modules/auth/auth.module';
import {UsersModule} from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/banca', {
      useNewUrlParser: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/users', {
      useNewUrlParser: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    }),
    HealthCheckModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [DatabaseModule],
})
export class AppModule {}
