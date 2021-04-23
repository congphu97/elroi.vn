
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Background } from './background.model';
@Injectable()
export class BackgroundService {
    constructor(@InjectModel(Background) private BackgroundModel: ReturnModelType<typeof Background>) { }
    async createBackground(background: Background) {
        const newBackground = new this.BackgroundModel(background);
        return await newBackground.save();
    }

    async getOneBackground(id: string): Promise<Background> {
        const newBackground = this.BackgroundModel.findById({ _id: id })
        return newBackground;
    }

    async getBackground(query): Promise<Background[]> {
        const customQuery = {
            category: { $regex: new RegExp(query.category), $options: 'i' },

        };
        query = Object.assign(query, customQuery);
        const newBackground = this.BackgroundModel
            .find(query)
            .exec();
        return newBackground;
    }


    async updateBackground(id: string, background: Background): Promise<Background> {
        const newBackground = this.BackgroundModel.findByIdAndUpdate(id, background)
        return newBackground;
    }

    async deleteBackground(id: string): Promise<Background> {
        const newBackground = this.BackgroundModel.findByIdAndDelete(id)
        return newBackground;
    }

    async upLoad(id: string): Promise<Background> {
        const newBackground = this.BackgroundModel.findByIdAndDelete(id)
        return newBackground;
    }


}