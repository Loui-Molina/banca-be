import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { ConsortiumModule } from '@src/modules/consortiums/consortium.module';
import { BankingsModule } from '@bankings/bankings.module';

@Module({
    imports: [BankingsModule, ConsortiumModule],
    controllers: [CommonController],
    providers: [CommonService],
})
export class CommonModule {}
