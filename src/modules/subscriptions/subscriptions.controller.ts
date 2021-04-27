import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { CreateSubscriptionDto } from '@subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@subscriptions/dto/update-subscription.dto';
import { SubscriptionsService } from '@subscriptions/subscriptions.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { ApiTags } from '@nestjs/swagger';

@Controller('subscriptions')
@ApiTags('subscriptions')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.admin)
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Post()
    create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionsService.create(createSubscriptionDto);
    }

    @Get('all')
    findAll(@Query('q') q: string, @Query('value') value: string) {
        return this.subscriptionsService.find(q, value);
    }

    @Get()
    findOne(@Query('q') q: string, @Query('value') value: string) {
        return this.subscriptionsService.findOne(q, value);
    }

    @Put()
    update(@Body() updateSubscriptionDto: UpdateSubscriptionDto, @AuthUser() loggedUser: User) {
        return this.subscriptionsService.update(updateSubscriptionDto, loggedUser);
    }

    @Delete()
    remove(@Param('id') id: ObjectId) {
        return this.subscriptionsService.delete(id);
    }
}
