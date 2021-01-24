import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { ConsortiumModule } from '@src/modules/consortiums/consortium.module';
import { BankingModule } from '@src/modules/banking/banking.module';

@Module({
    imports: [BankingModule, ConsortiumModule],
    controllers: [CommonController],
    providers: [CommonService],
})
export class CommonModule {}
