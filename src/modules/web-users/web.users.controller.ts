import { Controller, UseGuards, Get, Query, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiFoundResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AuthUser } from "src/common/decorators/auth.user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "../database/datamodels/enums/role";
import { User } from "../database/datamodels/schemas/user";
import { WebUser } from "../database/datamodels/schemas/web.user";
import { ConstApp } from "../utils/const.app";
import { CreateWebUserDto } from "./dto/create.web.user.dto";
import { UpdateWebUserDto } from "./dto/update.web.user.dto";
import { WebUserDto } from "./dto/web.user.dto";
import { WebUsersService } from "./web.users.service";


@Controller('webusers')
@ApiTags('webusers')
@UseGuards(AuthGuard(), RolesGuard)
export class WebUsersController {
    constructor(private readonly webUsersService: WebUsersService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: WebUserDto,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    findAll(@AuthUser() user: User) {
        return this.webUsersService.findAll(user);
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: WebUserDto,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    findOne(@Query('field') field: string, @Query('value') value: any, @AuthUser() user: User): Promise<WebUserDto[]> {
        return this.webUsersService.getFiltered(field, value, user);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: WebUser,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    create(@Body() dto: CreateWebUserDto, @AuthUser() user: User): Promise<WebUser> {
        return this.webUsersService.create(dto, user);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: WebUser,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    update(@Body() dto: UpdateWebUserDto, @AuthUser() user: User): Promise<WebUser> {
        return this.webUsersService.update(dto, user);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: WebUser,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    delete(@Param('id') id: string, @AuthUser() user: User): Promise<WebUser> {
        return this.webUsersService.delete(id, user);
    }
}
