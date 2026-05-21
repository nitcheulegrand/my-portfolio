import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from './education.schema';

@Injectable()
export class EducationService {
    constructor(
        @InjectModel(Education.name) private educationModel: Model<Education>
    ) {}

    findAll(): Promise<Education[]> {
        return this.educationModel.find().exec();
    }

    create(educationData: Education): Promise<Education> {
        const education = new this.educationModel(educationData);
        console.log(education);
        return education.save();
    }

    update(id: string, educationData: Education) {
        return this.educationModel.findByIdAndUpdate(id, educationData, { new: true }).exec();
    }

    delete(id: string) {
        return this.educationModel.findByIdAndDelete(id).exec();
    }
}
