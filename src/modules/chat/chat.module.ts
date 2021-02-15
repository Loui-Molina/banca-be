import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from '../database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from '../database/datamodels/schemas/consortium';
import { Message, MessageSchema } from '../database/datamodels/schemas/message';
import { ConstApp } from '../utils/const.app';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }], ConstApp.BANKING),
    ],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [MongooseModule],
})
export class ChatModule {}
