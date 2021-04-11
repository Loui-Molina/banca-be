import { Global, Module } from '@nestjs/common';
import { DateHelper } from '@utils/date.helper';

@Global()
@Module({
    providers: [DateHelper],
})
export class UtilsModule {}
