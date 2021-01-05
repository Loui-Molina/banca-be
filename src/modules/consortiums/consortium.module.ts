import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConsortiumService} from '@src/modules/consortiums/consortium.service';
import {ConsortiumController} from '@src/modules/consortiums/consortium.controller';
import {Consortium, ConsortiumSchema} from '@src/modules/database/datamodels/schemas/consortium';
import {UsersModule} from "@users/users.module";
import {User, UserSchema} from "@database/datamodels/schemas/user";
import {AuthModule} from "@auth/auth.module";

@Module({
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([{name: Consortium.name, schema: ConsortiumSchema}], 'banca'),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}], 'user'),
    ],
    providers: [ConsortiumService],
    controllers: [ConsortiumController],
    exports: [ConsortiumService, MongooseModule],
})
export class ConsortiumModule {
}
