import { prop, modelOptions, } from '@typegoose/typegoose';
export class Auth {
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
    numberPhone: number


    @prop()
    history: any[]

    @prop()
    role: string

}

