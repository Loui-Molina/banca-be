import { Module } from '@nestjs/common';
import { AdminLotteryModule } from '@lotteries/admin/admin.lottery.module';
import { BankingLotteryModule } from '@lotteries/banking/banking.lottery.module';
import { ConsortiumLotteryModule } from '@lotteries/consortium/consortium.lottery.module';

@Module({
    imports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule],
    exports: [AdminLotteryModule, BankingLotteryModule, ConsortiumLotteryModule],
})
export class LotteriesModule {}
