import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, default: null})
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User)