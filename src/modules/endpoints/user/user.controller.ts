import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {UserDto} from './dto/user.dto';
import {UserService} from './user.service';
import {User, UserDocument} from "src/common/datamodels/schemas/User";
import { plainToClass } from "class-transformer";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    getAll(): Promise<Array<UserDocument>> {
        return this.userService.getAll();
    }

    @Get('search')
    getFiltered(@Query('q') q, @Query('value') value): Promise<Array<UserDocument>> {
        return this.userService.getFiltered(q, value);
    }

    @Post()
    save(@Body() userDto: UserDto): Promise<UserDocument> {
        return this.userService.save(userDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<UserDocument> {
        return this.userService.delete(id);
    }

    @Get(':id')
    get(@Param('id') id: string): UserDto {
        return plainToClass(UserDto, this.userService.get(id));
    }
}
