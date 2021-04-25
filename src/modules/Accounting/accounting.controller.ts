import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { AccountingService } from '@src/modules/Accounting/accounting.service';

@Controller('accounting')
@ApiTags('accounting')
@UseGuards(AuthGuard(), RolesGuard)
export class AccountingController {
    constructor(private readonly accountingService: AccountingService) {}
}
