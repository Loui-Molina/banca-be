import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommonService } from '@common.module/common.service';
import { User } from '@database/datamodels/schemas/user';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@auth/guards/roles.guard';
import { ConstApp } from '@utils/const.app';

@ApiTags('common')
@Controller('common')
@UseGuards(AuthGuard(), RolesGuard)
export class CommonController {
    constructor(private readonly commonService: CommonService) {}

    @Get('/establishmentName')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: String,
    })
    @UseGuards(AuthGuard())
    getEstablishmentName(@AuthUser() user: User): Promise<{ name: string }> {
        return this.commonService.getEstablishmentName(user);
    }
}
