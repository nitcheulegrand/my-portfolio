import { Body, Request, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { EducationService } from './education.service';
import { Education } from './education.schema';

@Controller('api/education')
export class EducationController {
    constructor(
        private educationService: EducationService
    ) {}

    @Get("all")
    async getAllEducation() {
        try {
            const education = await this.educationService.findAll();
            return education;
        }
        catch(error) {
            return { code: 500, error: error.message };
        }
    }

    @Post()
    async createEducation(@Body() educationData: Education) {
        try {
            const education = await this.educationService.create(educationData);
            return education;
        } catch(error) {
            return { code: 500, error: error.message, _error: error }
        }
    }

    @Put(':id')
    async updateEducation(@Request() req, @Body() educationData: Education) {
        try {
            const education = await this.educationService.update(req.params.id, educationData);
            return education;
        } catch(error) {
            return { code: 500, error: error.message }
        }
    }

    @Delete(':id')
    async deleteEducation(@Request() req) {
        try {
            await this.educationService.delete(req.params.id);
            return { _id: req.params.id, message: 'Education deleted successfully' };
        } catch(error) {
            return { code: 500, error: error.message }
        }
    }
}
