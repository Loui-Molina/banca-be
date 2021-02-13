import { Module } from '@nestjs/common';
import { CommonService } from '@common.module/common.service';
import { CommonController } from '@common.module/common.controller';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { BankingsModule } from '@bankings/bankings.module';
import { WebUsersModule } from '@web.users/web.users.module';

@Module({
    imports: [BankingsModule, ConsortiumModule, WebUsersModule],
    controllers: [CommonController],
    providers: [CommonService],
})
export class CommonModule {}
