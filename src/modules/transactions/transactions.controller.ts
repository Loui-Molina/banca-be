import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from '@transactions/transactions.service';
import { CreateTransactionDto } from '@transactions/dtos/create.transaction.dto';
import { ConstApp } from '@utils/const.app';
import { Transaction } from '@database/datamodels/schemas/transaction';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { ResponseQueryDto } from '@common/dto/response-query.dto';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(AuthGuard(), RolesGuard)
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('getAll')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResponseQueryDto,
    })
    @Roles(Role.admin, Role.consortium, Role.banker, Role.webuser)
    getAll(@Body() req: PaginationQueryDto, @AuthUser() loggedUser: User): Promise<ResponseQueryDto> {
        return this.transactionService.getAll(loggedUser, req);
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
