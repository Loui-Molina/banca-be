import { Controller,Request, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";

@Controller('user')
export class UserController{

    @Post()
    createUser() {
      return 'created';
    }
  
    @Get()
    getUser() {
      return 'user';
    }

    @Delete()
    deleteUser(){
        return 'deleted';
    }

}