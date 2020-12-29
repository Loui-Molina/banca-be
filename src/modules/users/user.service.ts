import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@database/datamodels/schemas/User';
import { UserDto } from '@users/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<Array<User>> {
    return this.userModel.find().exec();
  }

  async getFiltered(q: string, value: string): Promise<Array<User>> {
    return this.userModel.find({ [q]: value }).exec();
  }

  async create(userDto: UserDto): Promise<User> {
    const newUser = new this.userModel({
      ...userDto,
      creationDate: new Date(),
      creationUserId: '1',
      modificationDate: new Date(),
      modificationUserId: '1',
    });
    await newUser.save();
    return newUser;
  }

  async update(userDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(
        userDto._id,
        {
          username: userDto.username,
          password: userDto.password,
          name: userDto.name,
          modificationDate: new Date(),
          modificationUserId: '1',
        },
        {
          new: true,
        },
    )
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async get(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
}
