import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { AccountingService } from '@src/modules/Accounting/accounting.service';
import { ConstApp } from '@utils/const.app';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { AccountingDto } from '@src/modules/Accounting/dto/accounting.dto';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';

@Controller('accounting')
@ApiTags('accounting')
@UseGuards(AuthGuard(), RolesGuard)
export class AccountingController {
    constructor(private readonly accountingService: AccountingService) {}

    @Get()
    @Roles(Role.admin, Role.consortium)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AccountingDto,
    })
    getAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<Array<AccountingDto>> {
        const { limit, offset } = paginationQueryDto;
        return this.accountingService.getAll(limit, offset);
    }

    @Post('createTest')
    @Roles(Role.admin)
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AccountingDto,
    })
    createTest(@AuthUser() user: User) {
        return this.accountingService.create(user);
    }
}
