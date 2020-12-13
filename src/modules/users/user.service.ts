import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/datamodels/schemas/User';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  private users : User[];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(user: UserDto) {

    user.creationDate = new Date();
    user.creationUserId = "1";
    user.modificationDate = new Date();
    user.modificationUserId = "1";
    const newUser = new this.userModel(user);
    await newUser.save();
    console.log(newUser);
    return "Usuario Creado correctamente";
  }
      
}
