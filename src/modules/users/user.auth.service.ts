import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "../auth/dtos/auth.credentials.dto";
import { User, UserDocument } from "../database/datamodels/schemas/User";
import { isHalfWidth } from "class-validator";

@Injectable()
export class UserAuthService{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async singUp(authCredentialsDto : AuthCredentialsDto) : Promise<void>{
        const { username , password } = authCredentialsDto;

        const user = new this.userModel();
        user.username = username;
        user.salt = await bcrypt.genSalt(); 
        user.password = await this.hashPassword(password, user.salt);
        user.creationUserId = "1";
        user.modificationUserId = "1";
        try {
           await user.save();
        } catch(error){
            if(error.code === 11000){
                throw new ConflictException('Username already exists')}
            else{
                throw new InternalServerErrorException();
            }
        }
        
       
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}