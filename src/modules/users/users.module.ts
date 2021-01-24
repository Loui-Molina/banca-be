import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { User, UserSchema } from '@src/modules/database/datamodels/schemas/user';
import { BankingModule } from '@src/modules/banking/banking.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user')],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user')],
})
export class UsersModule {}
