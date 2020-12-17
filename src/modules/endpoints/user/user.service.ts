import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { User, UserDocument } from 'src/common/datamodels/schemas/User';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<Array<UserDocument>> {
    return this.userModel.find().exec();
  }


  async getFiltered(q: string, value:string): Promise<Array<UserDocument>> {
    return this.userModel.find({[q]:value}).exec();
  }

  async save(userDto: UserDto): Promise<UserDocument> {
    // TODO GET ACTUAL USER
    if(userDto._id){
      //UPDATE
      return this.userModel.findByIdAndUpdate(userDto._id, {
        username: userDto.username,
        password: userDto.password,
        name: userDto.name,
        modificationDate: new Date(),
        modificationUserId: '1',
      }, {
        new: true
      });
    } else {
      //CREATE
      userDto.creationDate = new Date();
      userDto.creationUserId = '1';
      userDto.modificationDate = new Date();
      userDto.modificationUserId = '1';
      const newUser = new this.userModel(userDto);
      await newUser.save();
      return newUser;
    }
  }

  async delete(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async get(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
