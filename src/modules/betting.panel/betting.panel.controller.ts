import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { ConstApp } from '@utils/const.app';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Bet } from '@database/datamodels/schemas/bet';
import { BettingPanelService } from '@src/modules/betting.panel/betting.panel.service';
import { BetDto } from '@src/modules/betting.panel/dtos/bet.dto';
import { CreateBetDto } from '@src/modules/betting.panel/dtos/create.bet.dto';

@ApiTags('bettingPanel')
@Controller('bettingPanel')
@UseGuards(AuthGuard(), RolesGuard)
export class BettingPanelController {
    constructor(private readonly bettingPanelService: BettingPanelService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Bet,
    })
    @Roles(Role.banker)
    getAll(): Promise<Array<Bet>> {
        return this.bettingPanelService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    getFiltered(@Query('q') q: string, @Query('value') value: any): Promise<Array<BetDto>> {
        return this.bettingPanelService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    create(@Body() dto: CreateBetDto, @AuthUser() loggedUser: User): Promise<BetDto> {
        return this.bettingPanelService.create(dto, loggedUser);
    }

    @Get('get/:id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    async get(@Param('id') id: string): Promise<BetDto> {
        return await this.bettingPanelService.get(id);
    }
}
