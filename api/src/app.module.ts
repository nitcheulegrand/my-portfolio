import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from "dotenv";
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { EducationModule } from './education/education.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

config();
const ATLAS_URI = process.env.ATLAS_URI ?? ""; 

@Module({
  imports: [
    MongooseModule.forRoot(ATLAS_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/",
      exclude: ["/api/(.*)"]
    }),
    ExperienceModule,
    ProjectModule,
    EducationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
