import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';
import { ConsortiumController } from '@src/modules/consortiums/consortium.controller';
import { Consortium, ConsortiumSchema } from '@src/modules/database/datamodels/schemas/consortium';
import { UsersModule } from '@users/users.module';
import { AuthUserModule } from '@src/modules/auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        AuthUserModule,
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
    ],
    providers: [ConsortiumService],
    controllers: [ConsortiumController],
    exports: [ConsortiumService],
})
export class ConsortiumModule {}
