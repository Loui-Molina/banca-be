import {BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {User} from '@database/datamodels/schemas/user';
import {Connection, Model, ObjectId} from 'mongoose';
import {Consortium} from '@database/datamodels/schemas/consortium';
import {Banking} from '@database/datamodels/schemas/banking';
import {MessageDto} from '@src/modules/chat/dtos/message.dto';
import {CreateMessageDto} from '@src/modules/chat/dtos/create.message.dto';
import {Role} from '@database/datamodels/enums/role';
import {Message} from '@database/datamodels/schemas/message';
import {ConstApp} from "@utils/const.app";

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
        if (!id) {
            throw new BadRequestException();
        }
        const messagesDto: MessageDto[] = [];
        const messages = await this.messageModel
            .find()
            .or([{ originId: id }, { destinationId: id }])
            .exec();
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

    async create(dto: CreateMessageDto, loggedUser: User): Promise<MessageDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let msg: Message;
        try {
            const id = await this.getIdOfConsortiumBanking(loggedUser);
            if (!id) {
                throw new BadRequestException();
            }
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
                    throw new BadRequestException();
                }
                id = consortiums.pop()._id;
                break;
            case Role.banker:
                // eslint-disable-next-line no-case-declarations
                const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
                if (bankings.length === 0) {
                    throw new BadRequestException();
                }
                id = bankings.pop()._id;
                break;
        }
        return id;
    }

    private async mapToDto(msg: Message): Promise<MessageDto> {
        const { _id, date, message, originId, destinationId } = msg;
        return {
            _id,
            date,
            message,
            originId,
            destinationId,
        };
    }
}
