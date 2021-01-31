import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { MessageDto } from '@chat/dtos/message.dto';
import { CreateMessageDto } from '@chat/dtos/create.message.dto';
import { ChatService } from '@chat/chat.service';
import { ReadMessageDto } from '@chat/dtos/read.message.dto';

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