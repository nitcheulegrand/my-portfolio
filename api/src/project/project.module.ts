import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])],
    providers: [ProjectService]
})
export class ProjectModule {}
