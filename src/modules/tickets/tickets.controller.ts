import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { TicketDto } from '@src/modules/tickets/dtos/ticket.dto';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { TicketsService } from '@src/modules/tickets/tickets.service';

@ApiTags('tickets')
@Controller('tickets')
@UseGuards(AuthGuard(), RolesGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: TicketDto,
    })
    @Roles(Role.consortium)
    getAll(@AuthUser() user: User): Promise<Array<TicketDto>> {
        return this.ticketsService.getAll(user);
    }
}
