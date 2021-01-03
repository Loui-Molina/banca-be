import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BankingService } from './banking.service';
import { CreateBankingDto } from './dto/create-banking.dto';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { BankingDto } from '@src/modules/banking/dto/banking.dto';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { UserDocument } from '@database/datamodels/schemas/user';

@Controller('bankings')
@ApiTags('bankings')
@UseGuards(AuthGuard())
export class BankingController {
    constructor(private readonly bankingService: BankingService) {}

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BankingDto,
    })
    create(@Body() createBankingDto: CreateBankingDto, @AuthUser() user: UserDocument) {
        return this.bankingService.create(createBankingDto, user);
    }

    @Get('/findAll')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    findAll(@AuthUser() user: UserDocument) {
        return this.bankingService.findAll(user);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    findOne(@Param('id') id: string) {
        return this.bankingService.findOne(id);
    }

    @Put(':id')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BankingDto,
    })
    update(@Param('id') id: string, @Body() updateBankingDto: BankingDto) {
        return this.bankingService.update(id, updateBankingDto);
    }

    @Delete(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    remove(@Param('id') id: string) {
        return this.bankingService.remove(id);
    }
}
