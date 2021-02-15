import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { Roles } from '@src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../database/datamodels/enums/role';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dtos/create.message.dto';
import { MessageDto } from './dtos/message.dto';
import { ReadMessageDto } from './dtos/read.message.dto';

@ApiTags('messages')
@Controller('messages')
@UseGuards(AuthGuard(), RolesGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: MessageDto,
    })
    @Roles(Role.consortium, Role.banker)
    getAll(@AuthUser() loggedUser: User): Promise<Array<MessageDto>> {
        return this.chatService.getAll(loggedUser);
    }

    @Get('unread')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: MessageDto,
    })
    @Roles(Role.consortium, Role.banker)
    getAllUnreadMessages(@AuthUser() loggedUser: User): Promise<Array<MessageDto>> {
        return this.chatService.getAllUnreadMessages(loggedUser);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: MessageDto,
    })
    @Roles(Role.consortium, Role.banker)
    create(@Body() dto: CreateMessageDto, @AuthUser() loggedUser: User): Promise<MessageDto> {
        return this.chatService.create(dto, loggedUser);
    }

    @Post('read')
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Boolean,
    })
    @Roles(Role.consortium, Role.banker)
    readMessages(@Body() dto: ReadMessageDto, @AuthUser() loggedUser: User): Promise<boolean> {
        return this.chatService.readMessages(dto, loggedUser);
    }
}
