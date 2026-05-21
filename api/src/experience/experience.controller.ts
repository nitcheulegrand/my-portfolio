import { Body, Controller, Get, Post, Request, Delete, Put } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.schema';
import { ProjectService } from 'src/project/project.service';
import mongoose from 'mongoose';

@Controller('experience')
export class ExperienceController {
    constructor(
        private experienceService: ExperienceService,
        private projectService: ProjectService
    ) {}

    @Get("all")
    async getAllExperiences() {
        try {
            const experiences = await this.experienceService.findAll();
            return experiences;
        }
        catch(error) {
            return { code: 500, error: error.message };
        }
    }

    @Post()
    async createExperience(@Body() experienceData: Experience) {
        try {
            const experience = await this.experienceService.create(experienceData);
            return experience;
        } catch(error) {
            return { code: 500, error: error.message }
        }
    }

    @Put(':id')
    async updateExperience(@Request() req, @Body() experienceData: Experience) {
        try {
            const experience = await this.experienceService.update(req.params.id, experienceData);
            return experience;
        } catch(error) {
            return { code: 500, error: error.message }
        }
    }

    @Delete(':id')
    async deleteExperience(@Request() req) {
        try {
            await this.experienceService.delete(req.params.id);
            return { _id: req.params.id, message: 'Experience deleted successfully' };
        } catch(error) {
            return { code: 500, error: error.message }
        }
    }
}