import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './experience.schema';
import { ProjectService } from 'src/project/project.service';
import { Project, ProjectSchema } from 'src/project/project.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Experience.name, schema: ExperienceSchema},
            { name: Project.name, schema: ProjectSchema}
        ])
    ],
    controllers: [ExperienceController],
    providers: [ExperienceService, ProjectService]
})
export class ExperienceModule {}
