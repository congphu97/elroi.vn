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
    numberPhone: number


    @prop()
    history: any[]

    @prop()
    role: string

}

