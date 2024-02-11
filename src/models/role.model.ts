import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Role {
    @Prop({enum: ["usuario", "administrador"], required: true})
    rol: string
}

export const RoleModel = SchemaFactory.createForClass(Role)