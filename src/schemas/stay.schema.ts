import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Stay {
    @Prop({required: true})
    title: string;

    @Prop({default: ""})
    desc: string;

    @Prop({required: true})
    date: string;

    @Prop({required: true})
    price: number;

    @Prop({default: 3})
    rating: number;

    @Prop({default: []})
    imgSrc: Array<string>;

    @Prop({default: []})
    types: Array<string>;
}

export const StaySchema = SchemaFactory.createForClass(Stay).index({title: 'text', desc: 'text'});