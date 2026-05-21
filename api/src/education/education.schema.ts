import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EducationDocument = HydratedDocument<Education>;

@Schema()
export class Education {

    @Prop({required: true})
    school: string;

    @Prop({required: true})
    location: string;

    @Prop({required: true})
    degree: string;

    @Prop()
    field_of_study: string;

    @Prop({required: true})
    from: Date;

    @Prop()
    to: Date;

    @Prop()
    description: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
