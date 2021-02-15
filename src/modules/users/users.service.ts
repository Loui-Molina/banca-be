import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { Repository } from '@common/interfaces/repository';
import { SomethingWentWrongException } from 'src/common/exceptions/something.went.wrong.exception';
import { Role } from '../database/datamodels/enums/role';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { UserDto } from './dtos/user.dto';


@Injectable()
export class UsersService implements Repository<User, UserDto> {
    private readonly logger: Logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectConnection(ConstApp.USER) private readonly connection: Connection,
    ) {}

    async getAll(limit: number, offset: number): Promise<Array<User>> {
        return this.userModel.find().skip(offset).limit(limit).exec();
    }

    async find(q: string, value: any): Promise<User[]> {
        return await this.userModel.find({ [q]: value }).exec();
    }

    async findOne(q: string, value: any): Promise<User> {
        return await this.userModel.findOne({ [q]: value }).exec();
    }

    async getSingleFilteredComplete(q: string, value: any): Promise<User> {
        return (
            await this.userModel
                .find({ [q]: value })
                .select('+password')
                .select('+salt')
                .exec()
        ).pop();
    }

    async getSingleFiltered(q: string, value: any): Promise<User> {
        return (await this.userModel.find({ [q]: value }).exec()).pop();
    }

    async update(userDto: UserDto, loggedUser: User, userIp: string): Promise<User> {
        const session = await this.connection.startSession();
        session.startTransaction();

        let userUpdated: User;
        try {
            if (
                loggedUser.role === Role.consortium &&
                (userDto.role === Role.admin || userDto.role === Role.consortium)
            ) {
                throw new BadRequestException(ConstApp.UNAUTHORIZE_TO_UPDATE_USER);
            }
            userUpdated = await this.userModel.findByIdAndUpdate(
                userDto._id,
                {
                    ...userDto,
                },
                { new: true },
            );
            if (!userUpdated) {
                throw new SomethingWentWrongException();
            }
            session.commitTransaction();
        } catch (e) {
            this.logger.debug(e);
            session.abortTransaction();
            throw new BadRequestException(ConstApp.UNABLE_TO_UPDATE_USER);
        } finally {
            session.endSession();
        }
        return userUpdated;
    }

    async delete(id: ObjectId): Promise<User> {
        return this.userModel.findOneAndDelete(id).exec();
    }

    async get(id: ObjectId): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    newUserModel(): User {
        return new this.userModel();
    }

    async getForValidation(_id: ObjectId, role: Role): Promise<User> {
        return await this.userModel.findById({ _id, role }).exec();
    }

    async getUserByUsernameRole(username: string, role: Role): Promise<User> {
        return await this.userModel.findOne({ username, role }).exec();
    }

    async getUserByUsernameAndSalt(_id: ObjectId): Promise<User> {
        return await this.userModel.findById(_id).select('+salt').exec();
    }
}
