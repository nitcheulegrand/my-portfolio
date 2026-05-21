import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Project } from "src/project/project.schema";

export type ExperienceDocument = HydratedDocument<Experience>;

@Schema()
export class Experience {
    @Prop({required: true})
    company: string;

    @Prop({required: true})
    job_title: string;

    @Prop({required: true})
    location: string;

    @Prop({required: true})
    from: Date;

    @Prop()
    to: Date;

    @Prop({required: true})
    description: string;

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Project"})
    projects: Project[];
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);