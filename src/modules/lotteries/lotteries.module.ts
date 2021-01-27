import { Module } from '@nestjs/common';
import { AdminLotteryModule } from './admin/admin.lottery.module';
import { BankingLotteryModule } from './banking/banking.lottery.module';
import { ConsortiumLotteryModule } from './consortium/consortium.lottery.module';

@Module({
    imports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule],
    exports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule],
})
export class LotteriesModule {}
