import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from '@health-check/health-check.module';
import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'banca',
      useFactory: async (config: ConfigService) => ({
       uri: config.get('bancaDB'),
       useNewUrlParser: true,
       useUnifiedTopology: true,
      }),
      inject: [ConfigService],
     }),
     MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'user',
      useFactory: async (config: ConfigService) => ({
       uri: config.get('userDB'),
       useNewUrlParser: true,
       useUnifiedTopology: true,
      }),
      inject: [ConfigService],
     }),
    HealthCheckModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [DatabaseModule,UsersModule],
})
export class AppModule {}
