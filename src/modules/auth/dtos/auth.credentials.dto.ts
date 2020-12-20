import { Roles } from "@src/modules/database/datamodels/enums/Roles";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Constants } from "../utils/constants";


export class AuthCredentialsDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message:Constants.PASSWORD_MESSAGE})
    password: string;

    role:Roles;
}