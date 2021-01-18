import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from '@src/modules/transactions/transaction.service';
import { CreateTransactionDto } from '@src/modules/transactions/dtos/create.transaction.dto';
import { ConstApp } from '@utils/const.app';
import { Transaction } from '@src/modules/database/datamodels/schemas/transaction';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { TransactionDto } from '@src/modules/transactions/dtos/transaction.dto';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(AuthGuard(), RolesGuard)
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: TransactionDto,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    getAll(@AuthUser() loggedUser: User): Promise<Array<TransactionDto>> {
        return this.transactionService.getAll(loggedUser);
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Transaction,
    })
    @Roles(Role.admin)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    getFiltered(@Query('q') q: string, @Query('value') value: any): Promise<Array<Transaction>> {
        return this.transactionService.getFiltered(q, value);
    }

    @Post('create/transaction/admin')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Transaction,
    })
    @Roles(Role.admin)
    createTransactionAdmin(@Body() dto: CreateTransactionDto, @AuthUser() loggedUser: User): Promise<Transaction> {
        return this.transactionService.createTransactionAdmin(dto, loggedUser);
    }

    @Post('create/transaction/consortium')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Transaction,
    })
    @Roles(Role.consortium)
    createTransactionConsortium(@Body() dto: CreateTransactionDto, @AuthUser() loggedUser: User): Promise<Transaction> {
        return this.transactionService.createTransactionConsortium(dto, loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Transaction,
    })
    @Roles(Role.admin)
    async get(@Param('id') id: string): Promise<Transaction> {
        return await this.transactionService.get(id);
    }
}
