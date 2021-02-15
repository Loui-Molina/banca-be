import { Module } from '@nestjs/common';
import { BankingsModule } from '../bankings/bankings.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { WebUsersModule } from '../web-users/web.users.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';


@Module({
    imports: [BankingsModule, ConsortiumModule, WebUsersModule],
    controllers: [CommonController],
    providers: [CommonService],
})
export class CommonModule {}
