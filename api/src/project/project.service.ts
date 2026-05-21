import { Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from './project.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>
    ) {}

    createMany(projects: Project[]): Promise<ProjectDocument[]> {
        return this.projectModel.insertMany(projects);
    }

    findAllByProjectIds(projectIds: mongoose.Types.ObjectId[]) {
        return this.projectModel.find({ _id: { $in: projectIds } }).exec();
    }

    deleteMany(projectIds: mongoose.Types.ObjectId[]) {
        return this.projectModel.deleteMany({ _id: { $in: projectIds } }).exec();
    }
}
