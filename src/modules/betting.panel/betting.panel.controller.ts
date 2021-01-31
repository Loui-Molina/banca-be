import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@database/datamodels/schemas/user';
import { ConstApp } from '@utils/const.app';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Bet } from '@database/datamodels/schemas/bet';
import { BettingPanelService } from '@betting.panel/betting.panel.service';
import { BetDto } from '@betting.panel/dtos/bet.dto';
import { CreateBetDto } from '@betting.panel/dtos/create.bet.dto';
import { UpdateBetDto } from '@betting.panel/dtos/update.bet.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { ResumeSellsDto } from '@betting.panel/dtos/resume.sells.dto';
import { ClaimBetDto } from '@betting.panel/dtos/claim.bet.dto';

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

    @Get('resume/sells')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResumeSellsDto,
    })
    @Roles(Role.banker)
    getResumeSells(@AuthUser() loggedUser: User): Promise<ResumeSellsDto> {
        return this.bettingPanelService.getResumeSells(loggedUser);
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

    @Put('cancel')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    cancelBet(@Body() dto: UpdateBetDto, @AuthUser() loggedUser: User): Promise<BetDto> {
        return this.bettingPanelService.cancelBet(dto, loggedUser);
    }

    @Put('search/ticket')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    getClaimTicket(@Body() dto: ClaimBetDto, @AuthUser() loggedUser: User): Promise<BetDto> {
        return this.bettingPanelService.getClaimTicket(dto, loggedUser);
    }

    @Put('claim')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BetDto,
    })
    @Roles(Role.banker)
    claimTicket(@Body() dto: ClaimBetDto, @AuthUser() loggedUser: User): Promise<BetDto> {
        return this.bettingPanelService.claimTicket(dto, loggedUser);
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
