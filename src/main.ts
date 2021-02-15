import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import { AnyExceptionFilter } from '@common/filters/any.exception.filter';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import * as Express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = Express();
server.get('/',(req,res)=> res.send('ok'));
server.get('/_ah/health',(req,res)=> res.send('ok'));

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
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

    await app.listen(process.env.PORT || 3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
