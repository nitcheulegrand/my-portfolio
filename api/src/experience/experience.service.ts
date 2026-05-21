import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Collection, Model } from 'mongoose';
import { Experience, ExperienceDocument } from 'src/experience/experience.schema';
import { Project, ProjectDocument } from 'src/project/project.schema';

@Injectable()
export class ExperienceService {
    constructor(
        @InjectModel(Experience.name) private experienceModel: Model<Experience>,
        @InjectModel(Project.name) private projectModel: Model<Project>
    ) {}

    async findAll(): Promise<Experience[]> {
        return this.experienceModel.find().populate<{projects: Project[]}>("projects");
    }

    async create(experienceDoc: Experience): Promise<Experience> {
        let projects: ProjectDocument[] = [];
        if (experienceDoc?.projects.length) {
            projects = await Promise.all(experienceDoc.projects.map(async (project) => {
                return await (new this.projectModel(project)).save();
            }));
        }
        const projectIds = projects.map(project => project._id);
        const experience = new this.experienceModel({...experienceDoc, projects: projectIds});
        const savedExperience = await experience.save();
        return savedExperience.populate<{projects: Project[]}>("projects");
    }

    update(id: string, experienceData: Experience) {
        return this.experienceModel.findByIdAndUpdate(id, experienceData, { new: true }).exec();
    }

    delete(id: string) {
        return this.experienceModel.findByIdAndDelete(id).exec();
    }
}
