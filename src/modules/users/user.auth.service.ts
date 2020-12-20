import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthCredentialsDto } from "../auth/dtos/auth.credentials.dto";
import { User, UserDocument } from "../database/datamodels/schemas/User";

@Injectable()
export class UserAuthService{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async singUp(authCredentialsDto : AuthCredentialsDto) : Promise<void>{
        const { username , password } = authCredentialsDto;

        const user = new this.userModel();
        user.username = username;
        user.password = password;
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
}