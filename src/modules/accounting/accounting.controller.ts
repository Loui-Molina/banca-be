import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { ConstApp } from '@utils/const.app';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { AccountingDto } from '@src/modules/accounting/dto/accounting.dto';
import { ObjectId } from 'mongoose';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { AccountingService } from './accounting.service';
import { ResponseQueryDto } from '@common/dto/response-query.dto';
import { FilterQueryDto } from '@common/dto/filter-query.dto';

@Controller('accounting')
@ApiTags('accounting')
@UseGuards(AuthGuard(), RolesGuard)
export class AccountingController {
    constructor(private readonly accountingService: AccountingService) {}

    @Post('/getAll')
    @Roles(Role.admin, Role.consortium)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AccountingDto,
    })
    getAll(@Body() req: FilterQueryDto[], @AuthUser() loggedUser: User): Promise<ResponseQueryDto> {
        return this.accountingService.getAll(req, loggedUser);
    }

    @Get('/get')
    @Roles(Role.admin, Role.consortium)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AccountingDto,
    })
    get(@Query() ids: { bankingId: ObjectId; weekId: ObjectId }): Promise<AccountingDto> {
        return this.accountingService.get(ids);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: AccountingDto,
    })
    @Roles(Role.admin, Role.consortium)
    update(@Body() dto: AccountingDto, @AuthUser() loggedUser: User): Promise<AccountingDto> {
        return this.accountingService.update(dto);
    }
}
