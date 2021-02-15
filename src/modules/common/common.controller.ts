import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiFoundResponse } from '@nestjs/swagger';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { CommonService } from './common.service';


@ApiTags('common')
@Controller('common')
@UseGuards(AuthGuard(), RolesGuard)
export class CommonController {
    constructor(private readonly commonService: CommonService) {}

    @Get('/establishment-name')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: String,
    })
    @UseGuards(AuthGuard())
    getEstablishmentName(@AuthUser() user: User): Promise<{ name: string }> {
        return this.commonService.getEstablishmentName(user);
    }
}
