import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { ConstApp } from '@utils/const.app';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Bet } from '@database/datamodels/schemas/bet';
import { BettingPanelService } from '@betting.panel/betting.panel.service';
import { BetDto } from '@betting.panel/dtos/bet.dto';
import { CreateBetDto } from '@betting.panel/dtos/create.bet.dto';
import { UpdateBetDto } from '@betting.panel/dtos/update.bet.dto';

@ApiTags('betting-panel')
@Controller('betting-panel')
@UseGuards(AuthGuard(), RolesGuard)
export class BettingPanelController {
    constructor(private readonly bettingPanelService: BettingPanelService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Bet,
    })
    @Roles(Role.banker)
    getAll(@AuthUser() loggedUser: User): Promise<Array<Bet>> {
        return this.bettingPanelService.getAll(loggedUser);
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

    @Put('/cancel')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    cancelBet(@Body() dto: UpdateBetDto, @AuthUser() loggedUser: User): Promise<BetDto> {
        return this.bettingPanelService.cancelBet(dto, loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    async get(@Param('id') id: string): Promise<BetDto> {
        return await this.bettingPanelService.get(id);
    }
}
