import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Administrator, Company, JobPost, Student } from '@prisma/client';
import { MailService } from 'src/integrations/sendinblue/sendinblue.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentService: StudentService,
    private readonly mailService: MailService,
  ) {}

  async findAdminById(id: string): Promise<Administrator | null> {
    return this.prisma.administrator.findUnique({
      where: { id },
    });
  }

  async fetchAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  async fetchAllCompanies(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  async fetchAllJobPosts(): Promise<JobPost[]> {
    return this.prisma.jobPost.findMany();
  }

  async sendJobAlert(studentId: string): Promise<void> {
    const student = await this.studentService.findStudentById(studentId);

    if (!student) {
      throw new NotFoundException('STUDENT_NOT_FOUND');
    }

    if (!student.jobAlert) {
      throw new BadRequestException('JOB_ALERT_DISABLED');
    }

    const jobPosts = await this.prisma.jobPost.findMany({
      where: {
        title: {
          contains: student.jobAlertTrigger,
        },
        description: {
          contains: student.jobAlertTrigger,
        },
      },
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

    // Send email with sendinblue integration
    this.mailService.sendJobAlerts(
      student.email,
      student.jobAlertTrigger,
      jobPosts,
    );
  }
}
