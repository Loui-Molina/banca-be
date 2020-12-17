import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/database/datamodels/schemas/User';
import { UserReq } from './dtos/user.req';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<Array<User>> {
    return this.userModel.find().exec();
  }

  async getFiltered(q: string, value: string): Promise<Array<User>> {
    return this.userModel.find({ [q]: value }).exec();
  }

  async save(userReq: UserReq): Promise<User> {
    // TODO GET ACTUAL USER
    if (userReq._id) {
      //UPDATE
      return this.userModel.findByIdAndUpdate(
        userReq._id,
        {
          username: userReq.username,
          password: userReq.password,
          name: userReq.name,
          modificationDate: new Date(),
          modificationUserId: '1',
        },
        {
          new: true,
        },
      );
    } else {
      //CREATE
      const newUser = new this.userModel({
        ...userReq,
        creationDate: new Date(),
        creationUserId: '1',
        modificationDate: new Date(),
        modificationUserId: '1',
      });
      await newUser.save();
      return newUser;
    }
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async get(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
}
