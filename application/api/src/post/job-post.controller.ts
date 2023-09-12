import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JobApplication, JobPost } from '@prisma/client';
import { Company, Student } from 'src/auth/auth.decorator';
import { JwtCompanyGuard, JwtStudentGuard } from 'src/auth/guards/jwt.guard';
import { SafeCompany } from 'src/company/company.dto';
import { SafeStudent } from 'src/student/student.dto';
import {
  CreateJobPostDto,
  FetchJobPostParams,
  JobPostDetails,
} from './job-post.dto';
import { JobPostService } from './job-post.service';

@Controller('api/post')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Get(':id')
  async getJobPostDetails(
    @Param() { id }: FetchJobPostParams,
  ): Promise<JobPostDetails> {
    return this.jobPostService.getJobPostDetails(id);
  }

  @UseGuards(JwtStudentGuard)
  @Post(':id/apply')
  async applyJob(
    @Student() student: SafeStudent,
    @Param() { id }: FetchJobPostParams,
  ): Promise<JobApplication> {
    return this.jobPostService.applyJob(student, id);
  }

  @UseGuards(JwtCompanyGuard)
  @Post('')
  async createNewJobOffer(
    @Company() company: SafeCompany,
    @Body() dto: CreateJobPostDto,
  ): Promise<JobPost> {
    return this.jobPostService.createJobPost(company, dto);
  }
}
