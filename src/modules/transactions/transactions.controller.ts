import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/decorators/auth.user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../database/datamodels/enums/role';
import { Transaction } from '../database/datamodels/schemas/transaction';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { CreateTransactionDto } from './dtos/create.transaction.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { TransactionService } from './transactions.service';


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

    @Post('create/transaction/banker')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Transaction,
    })
    @Roles(Role.banker)
    createTransactionBanking(@Body() dto: CreateTransactionDto, @AuthUser() loggedUser: User): Promise<Transaction> {
        return this.transactionService.createTransactionBanking(dto, loggedUser);
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
