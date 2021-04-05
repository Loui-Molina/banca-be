import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports } from 'winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { DailyRotateFile } from 'winston/lib/winston/transports';

@Injectable({ scope: Scope.TRANSIENT })
// export class AppLogger extends Logger {}
export class AppLogger implements LoggerService {
    private context?: string;
    private winstonLogger: Logger;

    public setContext(context: string) {
        this.context = context;
    }

    constructor() {
        //
        // As of winston@3, the default logging format is JSON.
        //
        this.winstonLogger = createLogger({
            transports: [
                new transports.Console({
                    format: winston.format.combine(
                        nestWinstonModuleUtilities.format.nestLike('BSOLUTIONS'),
                        winston.format.label(),
                    ),
                }),
                new DailyRotateFile({
                    eol: ' ' + new Date().toISOString() + ' \n',
                    filename: 'bsolutions-%DATE%.log',
                    dirname: `/root/logs`,
                    level: 'info',
                    handleExceptions: true,
                    json: false,
                    maxSize: '20m',
                    datePattern: 'DD-MM-yyyy',
                }),
            ],
            exitOnError: false,
        });
    }

    log(message: any, context?: string) {
        return this.winstonLogger.info(message, { context: context || this.context });
    }

    error(message: any, trace?: string, context?: string): any {
        return this.winstonLogger.error(message, { trace, context: context || this.context });
    }

    warn(message: any, context?: string): any {
        return this.winstonLogger.warn(message, { context: context || this.context });
    }

    debug(message: any, context?: string): any {
        return this.winstonLogger.debug(message, { context: context || this.context });
    }

    verbose(message: any, context?: string): any {
        return this.winstonLogger.verbose(message, { context: context || this.context });
    }
}
