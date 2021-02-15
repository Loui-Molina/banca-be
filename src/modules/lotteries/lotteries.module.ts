import { Module } from '@nestjs/common';
import { AdminLotteryModule } from './admin/admin.lottery.module';
import { BankingLotteryModule } from './banking/banking.lottery.module';
import { ConsortiumLotteryModule } from './consortium/consortium.lottery.module';
import { WebUserLotteryModule } from './web-user/web-user.lottery.module';

@Module({
    imports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule, WebUserLotteryModule],
    exports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule, WebUserLotteryModule],
})
export class LotteriesModule {}
