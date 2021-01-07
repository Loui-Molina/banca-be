import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {BankingService} from './banking.service';
import {CreateBankingDto} from './dto/create.banking.dto';
import {ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {ConstApp} from '@utils/const.app';
import {BankingDto} from '@src/modules/banking/dto/banking.dto';
import {AuthUser} from '@src/common/decorators/auth.user.decorator';
import {UserDocument} from '@database/datamodels/schemas/user';
import {UpdateBankingDto} from "@src/modules/banking/dto/update.banking.dto";
import {Banking} from "@database/datamodels/schemas/banking";
import {Roles} from "@src/common/decorators/roles.decorator";
import {Role} from "@database/datamodels/enums/role";

@Controller('banking')
@ApiTags('banking')
@UseGuards(AuthGuard())
export class BankingController {
    constructor(private readonly bankingService: BankingService) {}


    @Get('/findAll')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    findAll(@AuthUser() user: UserDocument) {
        return this.bankingService.findAll(user);
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    findOne(@Query('field') field: string, @Query('value') value: any,@AuthUser() user: UserDocument): Promise<BankingDto[]> {
        return this.bankingService.getFiltered(field, value,user);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Banking,
    })
    @Roles(Role.admin, Role.consortium)
    create(@Body() createBankingDto: CreateBankingDto, @AuthUser() user: UserDocument): Promise<Banking> {
        return this.bankingService.create(createBankingDto, user);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Banking,
    })
    @Roles(Role.admin, Role.consortium)
    update(@Body() updateBankingDto: UpdateBankingDto, @AuthUser() user: UserDocument): Promise<Banking> {
        return this.bankingService.update(updateBankingDto, user);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Banking,
    })
    @Roles(Role.admin, Role.consortium)
    delete(@Param('id') id: string, @AuthUser() user: UserDocument): Promise<Banking> {
        return this.bankingService.delete(id, user);
    }
}
