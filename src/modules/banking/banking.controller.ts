import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {BankingService} from './banking.service';
import {CreateBankingDto} from './dto/create.banking.dto';
import {ApiCreatedResponse, ApiFoundResponse, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {ConstApp} from '@utils/const.app';
import {BankingDto} from '@src/modules/banking/dto/banking.dto';
import {AuthUser} from '@src/common/decorators/auth.user.decorator';
import {UserDocument} from '@database/datamodels/schemas/user';
import {DeleteBankingDto} from "@src/modules/banking/dto/delete.banking.dto";
import {UpdateBankingDto} from "@src/modules/banking/dto/update.banking.dto";

@Controller('banking')
@ApiTags('banking')
@UseGuards(AuthGuard())
export class BankingController {
    constructor(private readonly bankingService: BankingService) {}

    @Post('/create')
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

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    findOne(@Query('field') field: string, @Query('value') value: any,@AuthUser() user: UserDocument) {
        return this.bankingService.getFiltered(field, value,user);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: BankingDto,
    })
    update(@Body() updateBankingDto: UpdateBankingDto) {
        return this.bankingService.update(updateBankingDto);
    }

    @Delete()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    remove(@Body() removeDto: DeleteBankingDto) {
        return this.bankingService.remove(removeDto);
    }
}
