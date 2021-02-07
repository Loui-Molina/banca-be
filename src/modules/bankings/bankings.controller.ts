import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BankingsService } from './bankings.service';
import { CreateBankingDto } from './dto/create.banking.dto';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { BankingDto } from '@bankings/dto/banking.dto';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { UpdateBankingDto } from '@bankings/dto/update.banking.dto';
import { Banking } from '@database/datamodels/schemas/banking';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';

@Controller('banking')
@ApiTags('banking')
@UseGuards(AuthGuard(), RolesGuard)
export class BankingsController {
    constructor(private readonly bankingService: BankingsService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    findAll(@AuthUser() user: User) {
        return this.bankingService.findAll(user);
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    findOne(@Query('field') field: string, @Query('value') value: any, @AuthUser() user: User): Promise<BankingDto[]> {
        return this.bankingService.getFiltered(field, value, user);
    }

    @Get('bankingOfBanquer')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Banking,
    })
    @Roles(Role.banker)
    getBankingOfBanquer(@AuthUser() user: User): Promise<Banking> {
        return this.bankingService.getBankingOfBanquer(user);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Banking,
    })
    @Roles(Role.admin, Role.consortium)
    create(@Body() createBankingDto: CreateBankingDto, @AuthUser() user: User): Promise<Banking> {
        return this.bankingService.create(createBankingDto, user);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Banking,
    })
    @Roles(Role.admin, Role.consortium)
    update(@Body() updateBankingDto: UpdateBankingDto, @AuthUser() user: User): Promise<Banking> {
        return this.bankingService.update(updateBankingDto, user);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: Banking,
    })
    @Roles(Role.admin, Role.consortium)
    delete(@Param('id') id: string, @AuthUser() user: User): Promise<Banking> {
        return this.bankingService.delete(id, user);
    }
}
