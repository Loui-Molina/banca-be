import { Body, Controller, Delete, Get, Ip, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserDto } from '@users/dtos/user.dto';
import { UserService } from '@users/user.service';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';

@ApiTags('users')
@Controller(' ')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getAll(): Promise<Array<User>> {
        return this.userService.getAll();
    }

    @Get('search')
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<User>> {
        return this.userService.getFiltered(q, value);
    }

    /*
    @Post()
    @Roles(Role.admin)
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: User,
    })
    create(@Body() dto: UserDto, @AuthUser() loggedUser: UserDocument): Promise<User> {
        return this.userService.create(dto, loggedUser);
    }
    */

    @Put()
    @Roles(Role.admin)
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: User,
    })
    update(@Ip() userIp: string, @Body() dto: UserDto, @AuthUser() loggedUser: UserDocument): Promise<User> {
        return this.userService.update(dto, loggedUser, userIp);
    }

    @Delete(':id')
    @Roles(Role.admin)
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: User,
    })
    delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }

    @Get('get/:id')
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    async get(@Param('id') id: string): Promise<User> {
        return await this.userService.get(id);
    }
}
