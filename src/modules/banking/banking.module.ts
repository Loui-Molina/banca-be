import {Module} from '@nestjs/common';
import {BankingService} from './banking.service';
import {BankingController} from './banking.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Consortium, ConsortiumSchema} from '@database/datamodels/schemas/consortium';
import {UsersModule} from "@users/users.module";
import {ConsortiumModule} from "@src/modules/consortiums/consortium.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Consortium.name,
            schema: ConsortiumSchema
        }], 'banca'),
        UsersModule,
        ConsortiumModule],
    controllers: [BankingController],
    providers: [BankingService],
})
export class BankingModule {
}
