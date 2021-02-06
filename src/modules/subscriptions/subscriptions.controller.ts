import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ObjectId } from 'mongoose';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Post()
    create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionsService.create(createSubscriptionDto);
    }

    @Get('find')
    findAll(@Query('q') q: string, @Query('value') value: string) {
        return this.subscriptionsService.find(q, value);
    }

    @Get('findOne')
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
