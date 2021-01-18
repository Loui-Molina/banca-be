import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    private logger: Logger = new Logger(AnyExceptionFilter.name);

    catch(error: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            message: error.message,
            statusCode: status,
        });
        this.logger.error(response + error.stack);
    }
}
