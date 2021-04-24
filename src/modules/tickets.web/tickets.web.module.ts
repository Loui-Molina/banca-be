import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { ConstApp } from '@utils/const.app';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { TicketsWebService } from '@src/modules/tickets.web/tickets.web.service';
import { TicketsWebController } from '@src/modules/tickets.web/tickets.web.controller';
import { WebUser, WebUserSchema } from '@database/datamodels/schemas/web.user';
import { User, UserSchema } from '@database/datamodels/schemas/user';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER),
        ConsortiumModule,
    ],
    providers: [TicketsWebService],
    controllers: [TicketsWebController],
    exports: [MongooseModule],
})
export class TicketsWebModule {}
