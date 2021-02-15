import { Controller, UseGuards, Get, Query, Put, Ip, Body, HttpStatus, Delete, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiFoundResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AuthUser } from "src/common/decorators/auth.user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "../database/datamodels/enums/role";
import { User } from "../database/datamodels/schemas/user";
import { ConstApp } from "../utils/const.app";
import { ResponseDto } from "../utils/dtos/response.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";
import * as mongoose from 'mongoose';

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
        let responseDto: ResponseDto = new ResponseDto();
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
