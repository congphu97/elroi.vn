import { prop, modelOptions, } from '@typegoose/typegoose';
export class Auth {
    @prop()
    name: string
    
    @prop()
    username: string

    @prop()
    password: string

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
