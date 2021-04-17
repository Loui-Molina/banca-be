import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { TicketsWebService } from '@src/modules/tickets.web/tickets.web.service';
import { TicketWebDto } from '@src/modules/tickets.web/dtos/ticket.web.dto';

@ApiTags('tickets/web')
@Controller('tickets/web')
@UseGuards(AuthGuard(), RolesGuard)
export class TicketsWebController {
    constructor(private readonly ticketsWebService: TicketsWebService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: TicketWebDto,
    })
    @Roles(Role.admin, Role.consortium)
    getAll(@AuthUser() user: User): Promise<Array<TicketWebDto>> {
        return this.ticketsWebService.getAll(user);
    }
}
