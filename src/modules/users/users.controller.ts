import { Body, Controller, Delete, Get, HttpStatus, Ip, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UserDto } from '@users/dtos/user.dto';
import { UsersService } from '@users/users.service';
import { User } from '@database/datamodels/schemas/user';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import * as mongoose from 'mongoose';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { ResponseDto } from '@utils/dtos/response.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<Array<User>> {
        const { limit, offset } = paginationQueryDto;
        return this.userService.getAll(limit, offset);
    }

    @Get('search')
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<User>> {
        return this.userService.find(q, value);
    }

    @Put()
    @Roles(Role.admin, Role.consortium)
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: User,
    })
    update(@Ip() userIp: string, @Body() dto: UserDto, @AuthUser() loggedUser: User): ResponseDto {
        const user = this.userService.update(dto, loggedUser, userIp);
        const responseDto: ResponseDto = new ResponseDto();
        if (!user) {
            responseDto.statusCode = HttpStatus.BAD_REQUEST;
            responseDto.message = ConstApp.UNABLE_TO_UPDATE_USER;
        }
        responseDto.statusCode = HttpStatus.OK;
        responseDto.message = ConstApp.USER_UPDATED;
        return responseDto;
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
}
