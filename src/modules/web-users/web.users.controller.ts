import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { WebUsersService } from './web.users.service';
import { CreateWebUserDto } from './dto/create.web.user.dto';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { WebUserDto } from '@web.users/dto/web.user.dto';
import { WebUser } from '@database/datamodels/schemas/web.user';
import { UpdateWebUserDto } from '@web.users/dto/update.web.user.dto';

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
