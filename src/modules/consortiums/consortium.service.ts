import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Consortium, ConsortiumDocument} from '@database/datamodels/schemas/Consortium';
import {ConsortiumDto} from '@src/modules/consortiums/dtos/consortium.dto';

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

    async getFiltered(q: string, value: string): Promise<Array<ConsortiumDto>> {
        return this.consortiumModel.aggregate([{$match: {[q]: value}},
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
            }])
    }

    async create(dto: ConsortiumDto): Promise<Consortium> {
        const newObject = new this.consortiumModel({
            ...dto,
            creationUserId: dto.ownerUserId, //TODO Use logged user for this
            modificationUserId: dto.ownerUserId, //TODO Use logged user for this
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: ConsortiumDto): Promise<Consortium> {
        return this.consortiumModel.findByIdAndUpdate(
            dto._id,
            {
                name: dto.name,
                ownerUserId: dto.ownerUserId,
                status: dto.status,
                modificationUserId: dto.ownerUserId //TODO Use logged user for this
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
