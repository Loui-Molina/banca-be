import {Module} from '@nestjs/common';
import {BankingService} from '@src/modules/banking/banking.service';
import {BankingController} from '@src/modules/banking/banking.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Consortium, ConsortiumSchema} from '@database/datamodels/schemas/consortium';
import {UsersModule} from "@users/users.module";
import {ConsortiumModule} from "@src/modules/consortiums/consortium.module";
import {AuthUserModule} from '@src/modules/auth.user/auth.user.module';
import {Banking, BankingSchema} from "@database/datamodels/schemas/banking";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Consortium.name, schema: ConsortiumSchema}], 'banca'),
        MongooseModule.forFeature([{name: Banking.name, schema: BankingSchema}], 'banca'),
        UsersModule,
        AuthUserModule,
        ConsortiumModule],
    controllers: [BankingController],
    providers: [BankingService],
})
export class BankingModule {
}
