import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  JobApplication,
  JobArea,
  JobPost,
  JobType,
  SalaryRange,
  Skill,
} from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { SafeCompany } from 'src/company/company.dto';
import { SafeStudent } from 'src/student/student.dto';

export class FetchJobPostParams {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export type JobPostDetails = JobPost & {
  company: SafeCompany;
  skillsRequired: Skill[];
};

export type JobApplicationDetails = JobApplication & {
  post: JobPost;
  student: SafeStudent;
};

export class CreateJobPostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(JobArea)
  category: JobArea;

  @ApiProperty()
  @IsEnum(JobType)
  type: JobType;

  @ApiProperty()
  @IsEnum(SalaryRange)
  salary: SalaryRange;

  @ApiPropertyOptional()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
