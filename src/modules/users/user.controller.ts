import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {UserDto} from '@users/dtos/user.dto';
import {UserService} from '@users/user.service';
import {User} from '@database/datamodels/schemas/User';
import {ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '@src/common/decorators/roles.decorator';
import {Role} from '@database/datamodels/enums/role';
import {RolesGuard} from '@auth/guards/roles.guard';
import {ConstApp} from '@utils/const.app';
import {AuthService} from "@auth/auth.service";

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles(Role.admin, Role.consortium)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getAll(@Req() request: any): Promise<Array<User>> {
        return this.userService.getAll(request);
    }

    @Get('search')
    @Roles(Role.admin, Role.consortium)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<User>> {
        return this.userService.getFiltered(q, value);
    }

    @Post()
    @Roles(Role.admin, Role.consortium)
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: User,
    })
    create(@Body() dto: UserDto): Promise<User> {
        return this.userService.create(dto);
    }

    @Put()
    @Roles(Role.admin, Role.consortium)
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: User,
    })
    update(@Body() dto: UserDto): Promise<User> {
        return this.userService.update(dto);
    }

    @Delete(':id')
    @Roles(Role.admin, Role.consortium)
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: User,
    })
    delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }

    @Get(':id')
    @Roles(Role.admin, Role.consortium)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    async get(@Param('id') id: string): Promise<User> {
        return await this.userService.get(id);
    }
}
