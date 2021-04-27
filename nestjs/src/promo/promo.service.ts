
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Promo } from './promo.model';
@Injectable()
export class PromoService {
    constructor(@InjectModel(Promo) private promoModel: ReturnModelType<typeof Promo>) { }
    async createPromo(promo: Promo) {
        const newPromo = new this.promoModel(promo);
        return await newPromo.save();
    }

    async getPromos(query): Promise<Promo[]> {
        return await this.promoModel.find(query).exec();
    }

    async updatePromo(id: string, promo: Promo): Promise<Promo> {
        const newPromo = this.promoModel.findByIdAndUpdate(id, promo)
        return newPromo;
    }

    async deletePromo(id: string): Promise<Promo> {
        const newPromo = this.promoModel.findByIdAndDelete(id)
        return newPromo;
    }

    async getPromo(query): Promise<Promo> {
        return await this.promoModel.findOne(query).exec();

    }
}