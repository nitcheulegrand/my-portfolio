import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Experience } from "../experience/experience.schema";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({type: [String]})
    tools: string[];

    @Prop({type: [String]})
    technologies: string[];

    @Prop({type: [String]})
    images: string[];

    @Prop({type: [String]})
    links: string[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Experience"})
    experience: Experience;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);