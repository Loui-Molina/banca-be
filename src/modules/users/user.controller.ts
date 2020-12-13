import { Controller, Delete, Get, Post } from "@nestjs/common";

@Controller('user')
export class UserController{
    constructor(){

    }
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