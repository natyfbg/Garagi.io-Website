import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company, JobApplication, JobPost } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateCompanyDto } from 'src/auth/auth.dto';
import * as mime from 'mime-types';
import {
  getFileClientBucket,
  uploadClientBucket,
} from 'src/integrations/aws.s3';
import { JobPostService } from 'src/post/job-post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Stream } from 'stream';
import { SafeCompany, SetStateApplicationDto, UpdateCompanyDto } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobPostService: JobPostService,
  ) {}

  async findCompanyById(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  async findCompanyByEmail(email: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: { email },
    });
  }

  async createCompany(dto: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await bcrypt.hash(dto.password, 10),
      },
    });
  }

  async updateCompany(
    company: SafeCompany,
    dto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.prisma.company.update({
      where: { id: company.id },
      data: {
        description: dto.description,
      },
    });
  }

  async getCompanyPosts(company: SafeCompany): Promise<JobPost[]> {
    return this.jobPostService.getPostsByCompany(company);
  }

  async getJobApplications(company: SafeCompany): Promise<JobApplication[]> {
    return this.jobPostService.getApplicationsByCompany(company);
  }

  async getJobPostApplications(
    company: SafeCompany,
    jobPostId: string,
  ): Promise<JobApplication[]> {
    const post = await this.jobPostService.findJobPostById(jobPostId);

    if (post.companyId !== company.id) {
      throw new NotFoundException('POST_NOT_AVAILABLE');
    }

    const applications = await this.jobPostService.getJobPostApplications(
      post.id,
    );

    return applications;
  }

  async setStateJobApplication(
    company: SafeCompany,
    jobPostId: string,
    dto: SetStateApplicationDto,
  ): Promise<JobApplication> {
    const count = await this.prisma.jobPost.count({
      where: {
        id: jobPostId,
        companyId: company.id,
      },
    });

    if (count === 0) {
      throw new NotFoundException('POST_NOT_AVAILABLE');
    }

    const applicationDetails = await this.jobPostService.getApplicationDetails(
      jobPostId,
      dto.studentId,
    );

    if (!applicationDetails) {
      throw new NotFoundException('APPLICATION_NOT_FOUND');
    }

    if (applicationDetails.rejected && dto.rejected === true) {
      throw new BadRequestException('APPLICATION_ALREADY_REJECTED');
    }

    const jobApplication = await this.prisma.jobApplication.update({
      where: {
        studentId_postId: {
          studentId: dto.studentId,
          postId: jobPostId,
        },
      },
      data: {
        rejected: dto.rejected,
      },
    });

    return jobApplication;
  }

  async removeCompanyPost(
    company: SafeCompany,
    postId: string,
  ): Promise<boolean> {
    const count = await this.prisma.jobPost.count({
      where: {
        id: postId,
        companyId: company.id,
      },
    });

    if (count === 0) {
      throw new NotFoundException('POST_NOT_AVAILABLE');
    }

    await this.prisma.jobPost.delete({
      where: { id: postId },
    });

    return true;
  }

  async getCompanyLogo(id: string): Promise<Stream> {
    const company = await this.findCompanyById(id);

    if (!company) {
      throw new NotFoundException('COMPANY_NOT_FOUND');
    }

    const data = await getFileClientBucket(company.companyLogo);

    if (data.fileInfo.Metadata.owner && data.fileInfo.Metadata.owner !== id) {
      throw new ForbiddenException('FILE_BAD_ACCESS');
    }

    return data.stream;
  }

  async uploadLogo(
    company: SafeCompany,
    uploadedFile: Express.Multer.File,
  ): Promise<boolean> {
    const metadata = {
      mimetype: uploadedFile.mimetype,
      originalname: uploadedFile.originalname,
      typeIdentity: 'profilePicture',
    };

    const data = await uploadClientBucket(
      company.id,
      `logo.${mime.extension(uploadedFile.mimetype)}`,
      uploadedFile.buffer,
      metadata,
    );

    await this.prisma.company.update({
      where: { id: company.id },
      data: {
        companyLogo: data.Key,
      },
    });

    return true;
  }
}
