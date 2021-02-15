import { Module } from '@nestjs/common';
import { AdminLotteryModule } from '@lotteries/admin/admin.lottery.module';
import { BankingLotteryModule } from '@lotteries/banking/banking.lottery.module';
import { ConsortiumLotteryModule } from '@lotteries/consortium/consortium.lottery.module';
import { WebUserLotteryModule } from '@lotteries/web-user/web-user.lottery.module';

@Module({
    imports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule, WebUserLotteryModule],
    exports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule, WebUserLotteryModule],
})
export class LotteriesModule {}
