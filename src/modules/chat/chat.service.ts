import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, ObjectId } from 'mongoose';
import { Role } from '../database/datamodels/enums/role';
import { Banking } from '../database/datamodels/schemas/banking';
import { Consortium } from '../database/datamodels/schemas/consortium';
import { Message } from '../database/datamodels/schemas/message';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { CreateMessageDto } from './dtos/create.message.dto';
import { MessageDto } from './dtos/message.dto';
import { ReadMessageDto } from './dtos/read.message.dto';


@Injectable()
export class ChatService {
    private readonly logger: Logger = new Logger(ChatService.name);

    constructor(
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
        @InjectConnection(ConstApp.BANKING) private readonly connection: Connection,
    ) {}

    async getAll(loggedUser: User): Promise<Array<MessageDto>> {
        const id = await this.getIdOfConsortiumBanking(loggedUser);
        if (!id) throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);

        const messagesDto: MessageDto[] = [];
        const messages = await this.messageModel
            .find()
            .or([{ originId: id }, { destinationId: id }])
            .exec();
        return await this.getMessages(messages, id, loggedUser, messagesDto);
    }

    async getAllUnreadMessages(loggedUser: User): Promise<Array<MessageDto>> {
        const id = await this.getIdOfConsortiumBanking(loggedUser);
        if (!id) throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);

        const messagesDto: MessageDto[] = [];
        const messages = await this.messageModel
            .find()
            .and([{ destinationId: id }, { readed: false }])
            .exec();

        return await this.getMessages(messages, id, loggedUser, messagesDto);
    }

    private async getMessages(
        messages: Array<Message>,
        id: ObjectId,
        loggedUser: User,
        messagesDto: MessageDto[],
    ): Promise<MessageDto[]> {
        for await (const msg of messages) {
            const msgDto = await this.mapToDto(msg);
            let sender = false;
            if (msgDto.originId.toString() === id.toString()) {
                // Vos lo enviaste
                let destinationName: string;
                if (loggedUser.role === Role.consortium) {
                    const banking = await this.bankingModel.findById(msg.destinationId).exec();
                    destinationName = banking.name;
                }
                if (loggedUser.role === Role.banker) {
                    const banking = await this.bankingModel.findById(id).exec();
                    const consortium = await this.consortiumModel.findById(banking.consortiumId).exec();
                    destinationName = consortium.name;
                }
                msgDto.destinationName = destinationName;
                sender = true;
            } else {
                // Te lo enviaron
                let originName: string;
                if (loggedUser.role === Role.consortium) {
                    const banking = await this.bankingModel.findById(msg.originId).exec();
                    originName = banking.name;
                }
                if (loggedUser.role === Role.banker) {
                    const banking = await this.bankingModel.findById(id).exec();
                    const consortium = await this.consortiumModel.findById(banking.consortiumId).exec();
                    originName = consortium.name;
                }
                msgDto.originName = originName;
            }
            msgDto.sender = sender;
            messagesDto.push(msgDto);
        }
        return messagesDto;
    }

    async readMessages(dto: ReadMessageDto, loggedUser: User): Promise<boolean> {
        const id = await this.getIdOfConsortiumBanking(loggedUser);
        if (!id) throw new BadRequestException();

        let originId;
        if (loggedUser.role === Role.consortium) {
            const banking = await this.bankingModel.findById(dto.originId).exec();
            originId = banking._id;
        }
        if (loggedUser.role === Role.banker) {
            const banking = await this.bankingModel.findById(id).exec();
            originId = banking.consortiumId;
        }
        const messages = await this.messageModel
            .find()
            .and([{ originId: originId }, { destinationId: id }, { readed: false }])
            .exec();

        if (!messages) throw new BadRequestException(ConstApp.SOMETHING_WRONG_EXCEPTION);
        for (const message of messages) {
            message.readed = true;
            console.log('msg', message.message);
            await message.save();
        }
        return true;
    }

    async create(dto: CreateMessageDto, loggedUser: User): Promise<MessageDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let msg: Message;
        try {
            const id = await this.getIdOfConsortiumBanking(loggedUser);
            if (!id) throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);

            let destinationId;
            if (loggedUser.role === Role.consortium) {
                const banking = await this.bankingModel.findById(dto.destinationId).exec();
                destinationId = banking._id;
            }
            if (loggedUser.role === Role.banker) {
                const banking = await this.bankingModel.findById(id).exec();
                destinationId = banking.consortiumId;
            }
            await this.consortiumModel.findById(dto.destinationId);
            msg = new this.messageModel({
                originId: id,
                destinationId: destinationId,
                message: dto.message,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                date: new Date(),
                readed: false,
            });
            await msg.save();
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.USERNAME_EXISTS_ERROR);
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            session.endSession();
        }
        return this.mapToDto(msg);
    }

    private async getIdOfConsortiumBanking(loggedUser: User): Promise<ObjectId> {
        let id;
        switch (loggedUser.role) {
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
                if (consortiums.length === 0) {
                    throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
                }
                id = consortiums.pop()._id;
                break;
            case Role.banker:
                // eslint-disable-next-line no-case-declarations
                const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
                if (bankings.length === 0) {
                    throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
                }
                id = bankings.pop()._id;
                break;
        }
        return id;
    }

    private async mapToDto(msg: Message): Promise<MessageDto> {
        const { _id, date, message, originId, destinationId, readed } = msg;
        return {
            _id,
            date,
            message,
            originId,
            destinationId,
            readed,
        };
    }
}
