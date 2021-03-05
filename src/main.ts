import { APP_FILTER, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import { AnyExceptionFilter } from '@common/filters/any.exception.filter';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { AppLogger } from '@common/logger/app.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useLogger(new AppLogger());
    app.setGlobalPrefix(app.get('ConfigService').get('APP_GLOBAL_PREFIX'));
    app.useGlobalFilters(new AnyExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setTitle(app.get('ConfigService').get('APP_TITLE'))
        .setDescription(app.get('ConfigService').get('APP_DESCRIPTION'))
        .setVersion(app.get('ConfigService').get('APP_VERSION'))
        .addTag(app.get('ConfigService').get('APP_TAG'))
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(app.get('ConfigService').get('APP_SWAGGER_SETUP'), app, document);

    await app.listen(/*process.env.PORT || */ 3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
