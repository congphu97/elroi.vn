
import { Get, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Auth } from './auth.model';
@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth) private authModel: ReturnModelType<typeof Auth>) { }
    async createCustomauth(auth: Auth) {
        const createdauth = new this.authModel(auth);
        return await createdauth.save();
    }

    async listauths(): Promise<Auth[] | null> {
        return await this.authModel.find().exec();
    }
}