import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consortium, ConsortiumDocument } from '@database/datamodels/schemas/Consortium';
import { ConsortiumDto } from '@src/modules/consortiums/dtos/consortium.dto';

@Injectable()
export class ConsortiumService {
    constructor(@InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>) {}

    async getAll(): Promise<Array<ConsortiumDto>> {
        return this.consortiumModel
            .find()
            .projection('creationUserId modificationUserId ownerUserId _id name createdAt');
    }

    async getFiltered(q: string, value: string): Promise<Array<Consortium>> {
        return this.consortiumModel.find({ [q]: value }).exec();
    }

    async create(dto: ConsortiumDto): Promise<Consortium> {
        const newObject = new this.consortiumModel({
            ...dto,
            creationUserId: '1',
            modificationUserId: '1',
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: ConsortiumDto): Promise<Consortium> {
        return this.consortiumModel.findByIdAndUpdate(
            dto._id,
            {
                name: dto.name,
                modificationUserId: dto.modificationUserId,
            },
            {
                new: true,
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
