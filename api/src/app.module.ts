import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from "dotenv";
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { EducationModule } from './education/education.module';

config();
const ATLAS_URI = process.env.ATLAS_URI ?? ""; 

@Module({
  imports: [
    MongooseModule.forRoot(ATLAS_URI),
    ExperienceModule,
    ProjectModule,
    EducationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
