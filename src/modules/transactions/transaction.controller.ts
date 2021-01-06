import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from '@src/modules/transactions/transaction.service';
import { CreateTransactionDto } from '@src/modules/transactions/dtos/create.transaction.dto';
import {ConstApp} from "@utils/const.app";
import {Transaction} from "@src/modules/database/datamodels/schemas/transaction";
import {AuthUser} from "@src/common/decorators/auth.user.decorator";
import {UserDocument} from "@database/datamodels/schemas/user";
import {TransactionDto} from "@src/modules/transactions/dtos/transaction.dto";

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: TransactionDto,
    })
    getAll(): Promise<Array<TransactionDto>> {
        return this.transactionService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Transaction,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: any): Promise<Array<Transaction>> {
        return this.transactionService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Transaction,
    })
    create(@Body() dto: CreateTransactionDto, @AuthUser() loggedUser : UserDocument): Promise<Transaction> {
        return this.transactionService.create(dto, loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Transaction,
    })
    async get(@Param('id') id: string): Promise<Transaction> {
        return await this.transactionService.get(id);
    }
}
