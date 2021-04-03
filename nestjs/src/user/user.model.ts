import { prop, } from '@typegoose/typegoose';
export class User {
    @prop()
    username: string


    @prop()
    password: string

    @prop()
    name: string


    @prop()
    avatar: string

    @prop()
    birthday: string


    @prop()
    email: string

    @prop()
    phone: number


    @prop()
    history: []

    @prop()
    role: string

}

