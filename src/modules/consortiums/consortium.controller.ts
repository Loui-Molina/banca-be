import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { Roles } from '@src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../database/datamodels/enums/role';
import { Consortium } from '../database/datamodels/schemas/consortium';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { ConsortiumService } from './consortium.service';
import { ConsortiumDto } from './dtos/consortium.dto';
import { CreateConsortiumDto } from './dtos/create.consortium.dto';
import { UpdateConsortiumDto } from './dtos/update.consortium.dto';

@ApiTags('consortiums')
@Controller('consortiums')
@UseGuards(AuthGuard(), RolesGuard)
export class ConsortiumController {
    constructor(private readonly consortiumService: ConsortiumService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ConsortiumDto,
    })
    @Roles(Role.admin)
    getAll(): Promise<Array<ConsortiumDto>> {
        return this.consortiumService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Consortium,
    })
    @Roles(Role.admin)
    getFiltered(@Query('q') q: string, @Query('value') value: any): Promise<Array<Consortium>> {
        return this.consortiumService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Consortium,
    })
    @Roles(Role.admin)
    create(@Body() dto: CreateConsortiumDto, @AuthUser() loggedUser: User): Promise<Consortium> {
        return this.consortiumService.create(dto, loggedUser);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Consortium,
    })
    @Roles(Role.admin)
    update(@Body() dto: UpdateConsortiumDto, @AuthUser() loggedUser: User): Promise<Consortium> {
        return this.consortiumService.update(dto, loggedUser);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: Consortium,
    })
    @Roles(Role.admin)
    delete(@Param('id') id: string): Promise<Consortium> {
        return this.consortiumService.delete(id);
    }

    @Get('user')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Consortium,
    })
    @Roles(Role.consortium)
    async getConsortiumOfUser(@AuthUser() loggedUser: User): Promise<Consortium> {
        return await this.consortiumService.getConsortiumOfUser(loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Consortium,
    })
    @Roles(Role.admin)
    async get(@Param('id') id: string): Promise<Consortium> {
        return await this.consortiumService.get(id);
    }
}
