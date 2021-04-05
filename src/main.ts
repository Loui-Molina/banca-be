import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { AnyExceptionFilter } from '@common/filters/any.exception.filter';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { AppLogger } from '@common/logger/app.logger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { install } from 'source-map-support';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.set('trust proxy', true);
    app.use(helmet());
    app.useLogger(new AppLogger());
    app.setGlobalPrefix(app.get('ConfigService').get('APP_GLOBAL_PREFIX'));
    app.useGlobalFilters(new AnyExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    let port: number = parseInt(process.env.PORT);
    if (process.env.DEV == 'true') {
        install();
        const options = new DocumentBuilder()
            .setTitle(app.get('ConfigService').get('APP_TITLE'))
            .setDescription(app.get('ConfigService').get('APP_DESCRIPTION'))
            .setVersion(app.get('ConfigService').get('APP_VERSION'))
            .addTag(app.get('ConfigService').get('APP_TAG'))
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(app.get('ConfigService').get('APP_SWAGGER_SETUP'), app, document);
        port = 3000;
    }
    await app.listen(port);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
