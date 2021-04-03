import { prop, modelOptions, } from '@typegoose/typegoose';
export class Auth {
    @prop()
    username: string


    @prop()
    password: number

}
