import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from './role.model';

@Schema({
    timestamps: true
})
export class Auth {
    @Prop({required: true})
    username: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    password: string

    @Prop({default: true})
    status: boolean

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Role'})
    rolId: mongoose.Types.ObjectId | Role
}

export const AuthModel = SchemaFactory.createForClass(Auth)