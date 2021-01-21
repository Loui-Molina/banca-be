import { Body, Controller, Delete, Get, Ip, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UserDto } from '@users/dtos/user.dto';
import { UserService } from '@users/user.service';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import * as mongoose from 'mongoose';
import { PaginationQueryDto } from '@src/common/dto/pagination-query.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<Array<User>> {
        const { limit, offset }= paginationQueryDto
        return this.userService.getAll(limit,offset);
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

    @Put()
    @Roles(Role.admin)
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: User,
    })
    update(@Ip() userIp: string, @Body() dto: UserDto, @AuthUser() loggedUser: User): Promise<User> {
        return this.userService.update(dto, loggedUser, userIp);
    }

    @Delete(':id')
    @Roles(Role.admin)
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: User,
    })
    delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(new mongoose.Schema.Types.ObjectId(id));
    }

    @Get(':id')
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    async get(@Param('id') id: string): Promise<User> {
        return await this.userService.get(new mongoose.Schema.Types.ObjectId(id));
    }

    @Get('/establishment')
    @UseGuards(AuthGuard())
    getEstablishmentName(@AuthUser() user: User): Promise<{ name: string }> {
        return this.userService.getEstablishmentName(user);
    }
}
