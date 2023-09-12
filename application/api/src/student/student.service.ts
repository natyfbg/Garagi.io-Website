import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Skill, Student } from '@prisma/client';
import * as mime from 'mime-types';
import * as bcrypt from 'bcrypt';
import { CreateStudentDto } from 'src/auth/auth.dto';
import {
  getFileClientBucket,
  uploadClientBucket,
} from 'src/integrations/aws.s3';
import { PrismaService } from 'src/prisma/prisma.service';
import { Stream } from 'stream';
import { SafeStudent, UpdateStudentDto } from './student.dto';
import { JobPostService } from 'src/post/job-post.service';
import { JobPostDetails } from 'src/post/job-post.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postService: JobPostService,
  ) {}

  async findStudentById(id: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findStudentByEmail(email: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { email },
    });
  }

  async createStudent(dto: CreateStudentDto): Promise<Student> {
    return this.prisma.student.create({
      data: {
        email: dto.email,
        name: dto.name,
        firstname: dto.firstname,
        password: await bcrypt.hash(dto.password, 10),
      },
    });
  }

  async getStudentSkills(student: SafeStudent): Promise<Skill[]> {
    const result = await this.prisma.student.findUnique({
      where: { id: student.id },
      select: {
        skills: true,
      },
    });

    return result.skills;
  }

  async getStudentProfilePicture(id: string): Promise<Stream> {
    const student = await this.findStudentById(id);

    if (!student) {
      throw new NotFoundException('STUDENT_NOT_FOUND');
    }

    const data = await getFileClientBucket(student.profilePicture);

    if (data.fileInfo.Metadata.owner && data.fileInfo.Metadata.owner !== id) {
      throw new ForbiddenException('FILE_BAD_ACCESS');
    }

    return data.stream;
  }

  async getStudentCV(id: string): Promise<Stream> {
    const student = await this.findStudentById(id);

    if (!student) {
      throw new NotFoundException('STUDENT_NOT_FOUND');
    }

    if (!student.cv) {
      throw new NotFoundException('NO_COVER_LETTER');
    }

    const data = await getFileClientBucket(student.cv);

    if (data.fileInfo.Metadata.owner && data.fileInfo.Metadata.owner !== id) {
      throw new ForbiddenException('FILE_BAD_ACCESS');
    }

    return data.stream;
  }

  async getStudentCoverLetter(id: string): Promise<Stream> {
    const student = await this.findStudentById(id);

    if (!student) {
      throw new NotFoundException('STUDENT_NOT_FOUND');
    }

    if (!student.coverLetter) {
      throw new NotFoundException('NO_COVER_LETTER');
    }

    const data = await getFileClientBucket(student.coverLetter);

    if (data.fileInfo.Metadata.owner && data.fileInfo.Metadata.owner !== id) {
      throw new ForbiddenException('FILE_BAD_ACCESS');
    }

    return data.stream;
  }

  async updateStudent(
    student: SafeStudent,
    dto: UpdateStudentDto,
  ): Promise<boolean> {
    if (dto.jobAlert && !dto.jobAlterTrigger) {
      throw new BadRequestException('MISSING_JOB_ALTER_TRIGGER');
    }

    await this.prisma.student.update({
      where: { id: student.id },
      data: dto,
    });

    return true;
  }

  async updateSkills(
    student: SafeStudent,
    newSkills: string[],
  ): Promise<boolean> {
    const currentSkills = await this.prisma.skill.findMany({
      where: {
        students: {
          some: {
            id: student.id,
          },
        },
      },
    });

    newSkills = newSkills.map((s) => s.toUpperCase());

    const toDisconnect =
      currentSkills.length === 0
        ? []
        : currentSkills.length > newSkills.length
        ? currentSkills
            .filter((s) => !newSkills.includes(s.name))
            .map((s) => s.name)
        : newSkills.filter(
            (s) => currentSkills.findIndex((cs) => cs.name === s) === -1,
          );

    await this.prisma.student.update({
      where: {
        id: student.id,
      },
      data: {
        skills: {
          connectOrCreate: newSkills.map((s) => ({
            where: {
              name: s,
            },
            create: {
              name: s,
            },
          })),
          disconnect: toDisconnect.map((s) => ({ name: s })),
        },
      },
    });

    return true;
  }

  async uploadCV(
    student: SafeStudent,
    uploadedFile: Express.Multer.File,
  ): Promise<boolean> {
    const metadata = {
      mimetype: uploadedFile.mimetype,
      originalname: uploadedFile.originalname,
      typeIdentity: 'cv',
    };

    const data = await uploadClientBucket(
      student.id,
      `cv.${mime.extension(uploadedFile.mimetype)}`,
      uploadedFile.buffer,
      metadata,
    );

    await this.prisma.student.update({
      where: { id: student.id },
      data: {
        cv: data.Key,
      },
    });

    return true;
  }

  async uploadCoverLetter(
    student: SafeStudent,
    uploadedFile: Express.Multer.File,
  ): Promise<boolean> {
    const metadata = {
      mimetype: uploadedFile.mimetype,
      originalname: uploadedFile.originalname,
      typeIdentity: 'coverLetter',
    };

    const data = await uploadClientBucket(
      student.id,
      `coverLetter.${mime.extension(uploadedFile.mimetype)}`,
      uploadedFile.buffer,
      metadata,
    );

    await this.prisma.student.update({
      where: { id: student.id },
      data: {
        coverLetter: data.Key,
      },
    });

    return true;
  }

  async uploadProfilePicture(
    student: SafeStudent,
    uploadedFile: Express.Multer.File,
  ): Promise<boolean> {
    const metadata = {
      mimetype: uploadedFile.mimetype,
      originalname: uploadedFile.originalname,
      typeIdentity: 'profilePicture',
    };

    const data = await uploadClientBucket(
      student.id,
      `profilePicture.${mime.extension(uploadedFile.mimetype)}`,
      uploadedFile.buffer,
      metadata,
    );

    await this.prisma.student.update({
      where: { id: student.id },
      data: {
        profilePicture: data.Key,
      },
    });

    return true;
  }

  async setJobAlert(
    student: SafeStudent,
    newJobAlert: boolean,
  ): Promise<boolean> {
    await this.prisma.student.update({
      where: { id: student.id },
      data: {
        jobAlert: newJobAlert,
      },
    });
    return true;
  }

  async addPostToFavourites(
    student: SafeStudent,
    postId: string,
  ): Promise<boolean> {
    const post = await this.postService.findJobPostById(postId);

    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }

    await this.prisma.student.update({
      where: { id: student.id },
      data: {
        favorites: {
          connect: {
            id: post.id,
          },
        },
      },
    });

    return true;
  }

  async deletePostToFavourites(
    student: SafeStudent,
    postId: string,
  ): Promise<boolean> {
    const post = await this.postService.findJobPostById(postId);

    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }

    await this.prisma.student.update({
      where: { id: student.id },
      data: {
        favorites: {
          disconnect: {
            id: post.id,
          },
        },
      },
    });

    return true;
  }

  async getFavouritesLists(student: SafeStudent): Promise<JobPostDetails[]> {
    return this.prisma.jobPost.findMany({
      where: {
        studentLikes: {
          some: { id: student.id },
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
  }
}
