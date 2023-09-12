import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JobApplication, JobPost } from '@prisma/client';
import { SafeCompany } from 'src/company/company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SafeStudent } from 'src/student/student.dto';
import {
  CreateJobPostDto,
  JobApplicationDetails,
  JobPostDetails,
} from './job-post.dto';

@Injectable()
export class JobPostService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobPostDetails(id: string): Promise<JobPostDetails> {
    const jobPostDetails = await this.prisma.jobPost.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            companyLogo: true,
            createdAt: true,
            description: true,
            email: true,
            name: true,
            updatedAt: true,
            password: false,
          },
        },
        skillsRequired: true,
      },
    });

    if (!jobPostDetails) {
      throw new NotFoundException('JOB_POST_NOT_FOUND');
    }

    return jobPostDetails;
  }

  async applyJob(student: SafeStudent, id: string): Promise<JobApplication> {
    const jobPost = await this.prisma.jobPost.findUnique({
      where: {
        id,
      },
      include: {
        applications: true,
      },
    });

    if (!jobPost) {
      throw new NotFoundException('JOB_POST_NOT_FOUND');
    }

    if (jobPost.applications.find((a) => a.studentId === student.id)) {
      throw new ConflictException('ALREADY_APPLIED');
    }

    const application = await this.prisma.jobApplication.create({
      data: {
        post: {
          connect: {
            id: jobPost.id,
          },
        },
        student: {
          connect: {
            id: student.id,
          },
        },
      },
    });

    return application;
  }

  async getApplicationsByStudent(
    student: SafeStudent,
  ): Promise<(JobApplication & { post: JobPost })[]> {
    const applications = await this.prisma.jobApplication.findMany({
      where: {
        studentId: student.id,
      },
      include: {
        post: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return applications;
  }

  async removeApplication(student: SafeStudent, id: string): Promise<boolean> {
    const application = await this.prisma.jobApplication.findUnique({
      where: {
        studentId_postId: {
          postId: id,
          studentId: student.id,
        },
      },
    });

    if (!application) {
      throw new NotFoundException('JOB_APPLICATION_NOT_FOUND');
    }

    await this.prisma.jobApplication.delete({
      where: {
        studentId_postId: {
          studentId: student.id,
          postId: id,
        },
      },
    });

    return true;
  }

  async getPostsByCompany(company: SafeCompany): Promise<JobPost[]> {
    return this.prisma.jobPost.findMany({
      where: {
        companyId: company.id,
      },
    });
  }

  async getApplicationsByCompany(
    company: SafeCompany,
  ): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: {
        post: {
          companyId: company.id,
        },
      },
    });
  }

  async findJobPostById(id: string): Promise<JobPost> {
    return this.prisma.jobPost.findUnique({
      where: { id },
    });
  }

  async getJobPostApplications(postId: string): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: {
        postId,
      },
    });
  }

  async getApplicationDetails(
    postId: string,
    studentId: string,
  ): Promise<JobApplicationDetails> {
    return this.prisma.jobApplication.findUnique({
      where: {
        studentId_postId: {
          postId,
          studentId,
        },
      },
      include: {
        post: true,
        student: true,
      },
    });
  }

  async createJobPost(
    company: SafeCompany,
    dto: CreateJobPostDto,
  ): Promise<JobPost> {
    dto.skills = dto.skills.map((s) => s.toUpperCase());

    return this.prisma.jobPost.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        type: dto.type,
        salary: dto.salary,
        location: dto.location,
        company: {
          connect: {
            id: company.id,
          },
        },
        skillsRequired: {
          connectOrCreate: dto.skills.map((s) => ({
            where: {
              name: s,
            },
            create: {
              name: s,
            },
          })),
        },
      },
    });
  }
}
