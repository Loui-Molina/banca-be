import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsortiumService } from '@consortiums/consortium.service';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { UsersModule } from '@users/users.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConsortiumController } from '@consortiums/consortium.controller';
import { ConstApp } from '@utils/const.app';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        AuthUserModule,
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
    ],
    providers: [ConsortiumService],
    controllers: [ConsortiumController],
    exports: [ConsortiumService],
})
export class ConsortiumModule {}
