import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsortiumService } from '@consortiums/consortium.service';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { UsersModule } from '@users/users.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConsortiumController } from '@consortiums/consortium.controller';

@Module({
    imports: [
        UsersModule,
        AuthUserModule,
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
    ],
    providers: [ConsortiumService],
    controllers: [ConsortiumController],
    exports: [ConsortiumService],
})
export class ConsortiumModule {}
