import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstApp } from '@utils/const.app';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { Message, MessageSchema } from '@database/datamodels/schemas/message';
import { ChatService } from '@src/modules/chat/chat.service';
import { ChatController } from '@src/modules/chat/chat.controller';

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
