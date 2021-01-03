import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {ConsortiumDto} from '@src/modules/consortiums/dtos/consortium.dto';
import {Consortium, ConsortiumDocument} from "@src/modules/database/datamodels/schemas/consortium";
import {UserDocument} from "@database/datamodels/schemas/user";
import { ObjectId } from 'mongoose';

@Injectable()
export class ConsortiumService {
    constructor(@InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>) {
    }

    async getAll(): Promise<Array<ConsortiumDto>> {
        //TODO CHECK WHY IS IT ALL IN THE SAME COLLECTION AND IF IT WORKS ON SEPARATE ONES
        return this.consortiumModel.aggregate([{$match: {}},
            {
                $lookup: {
                    from: 'users',
                    localField: 'ownerUserId',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {$unwind: '$owner'},
            {
                $project: {
                    creationUserId: '$creationUserId',
                    modificationUserId: '$modificationUserId',
                    ownerUserId: '$owner._id',
                    ownerName: '$owner.username',
                    _id: '$_id',
                    name: '$name',
                    createdAt: '$createdAt',
                    status: '$status',
                    firstTransactionDate: '$firstTransactionDate'
                }
            }]);
    }

    async getFiltered(q: string, value: any): Promise<Array<Consortium>> {
        return this.consortiumModel.find({ [q]: value }).exec();
    }

    async create(dto: ConsortiumDto, loggedUser: UserDocument): Promise<Consortium> {
        //CREATE user
        const newObject = new this.consortiumModel({
            ...dto,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: ConsortiumDto, loggedUser: UserDocument): Promise<Consortium> {
        //UPDATE USER
        return this.consortiumModel.findByIdAndUpdate(
            dto._id,
            {
                name: dto.name,
                // ownerUserId: dto.ownerUserId, //TODO falta
                status: dto.status,
                modificationUserId: loggedUser._id
            },
            {
                new: false,
            },
        );
    }

    async delete(id: string): Promise<Consortium> {
        return this.consortiumModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<Consortium> {
        return await this.consortiumModel.findById(id).exec();
    }
}
