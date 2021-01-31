import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { ResultDto } from '@results/dtos/result.dto';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { MessageDto } from '@src/modules/chat/dtos/message.dto';
import { CreateMessageDto } from '@src/modules/chat/dtos/create.message.dto';
import { ChatService } from '@src/modules/chat/chat.service';

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

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: MessageDto,
    })
    @Roles(Role.consortium, Role.banker)
    create(@Body() dto: CreateMessageDto, @AuthUser() loggedUser: User): Promise<MessageDto> {
        return this.chatService.create(dto, loggedUser);
    }
}
