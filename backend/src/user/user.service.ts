
import { Get, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) { }
    async createUser(user: User) {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async getUser(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async updateUser(id: string, user: User): Promise<User> {
        const newUser = this.userModel.findByIdAndUpdate(id, user)
        return newUser;
    }

    async deleteUser(id: string): Promise<User> {
        const newUser = this.userModel.findByIdAndDelete(id)
        return newUser;
    }
}