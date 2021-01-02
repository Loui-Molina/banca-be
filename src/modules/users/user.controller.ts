import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserDto } from '@users/dtos/user.dto';
import { UserService } from '@users/user.service';
import { User } from '@database/datamodels/schemas/User';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {ConstApp} from "@utils/const.app";

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getAll(): Promise<Array<User>> {
        return this.userService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<User>> {
        return this.userService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: User,
    })
    create(@Body() dto: UserDto): Promise<User> {
        return this.userService.create(dto);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: User,
    })
    update(@Body() dto: UserDto): Promise<User> {
        return this.userService.update(dto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: User,
    })
    delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    async get(@Param('id') id: string): Promise<User> {
        return await this.userService.get(id);
    }
}
