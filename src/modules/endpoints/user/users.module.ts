import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from 'src/common/datamodels/schemas/User';
import {UserController} from './user.controller';
import {UserService} from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    providers: [UserService, User],
    controllers: [UserController],
    exports: [UserService],
})
export class UsersModule {
}
