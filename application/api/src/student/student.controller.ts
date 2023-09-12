import {
  Controller,
  Delete,
  Patch,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
  Param,
  Response,
  UseGuards,
  ParseFilePipe,
  FileTypeValidator,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplication, JobPost, Skill } from '@prisma/client';
import { Response as Res } from 'express';
import { Student } from 'src/auth/auth.decorator';
import { JwtStudentGuard } from 'src/auth/guards/jwt.guard';
import { FetchJobPostParams, JobPostDetails } from 'src/post/job-post.dto';
import { JobPostService } from 'src/post/job-post.service';
import {
  AddPostToFavouritesDto,
  FetchStudentParams,
  SafeStudent,
  UpdateSkillsDto,
  UpdateStudentDto,
} from './student.dto';
import { StudentService } from './student.service';

@Controller('api/student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly jobPostService: JobPostService,
  ) {}

  @UseGuards(JwtStudentGuard)
  @Get('me')
  async getLoggedInStudent(
    @Student() student: SafeStudent,
  ): Promise<SafeStudent & { skills: Skill[] }> {
    const skills = await this.studentService.getStudentSkills(student);

    return {
      skills,
      ...student,
    };
  }

  @UseGuards(JwtStudentGuard)
  @Get('me/applications')
  async getLoggedInStudentApplications(
    @Student() student: SafeStudent,
  ): Promise<(JobApplication & { post: JobPost })[]> {
    return this.jobPostService.getApplicationsByStudent(student);
  }

  @UseGuards(JwtStudentGuard)
  @Get('/me/skills')
  async getLoggedInStudentSkills(
    @Student() student: SafeStudent,
  ): Promise<Skill[]> {
    return this.studentService.getStudentSkills(student);
  }

  @UseGuards(JwtStudentGuard)
  @Delete('me/applications/:id')
  async removeLoggedInStudentApplication(
    @Student() student: SafeStudent,
    @Param() { id }: FetchStudentParams,
  ): Promise<boolean> {
    return this.jobPostService.removeApplication(student, id);
  }

  @Get(':id')
  async getStudentInformation(
    @Param() { id }: FetchStudentParams,
  ): Promise<SafeStudent> {
    const result = await this.studentService.findStudentById(id);

    if (!result) {
      throw new NotFoundException('STUDENT_NOT_FOUND');
    }

    const { password: _, ...student } = result;

    return student;
  }

  @Get(':id/profile_picture')
  async getStudentProfilePicture(
    @Response() res: Res,
    @Param() { id }: FetchStudentParams,
  ): Promise<void> {
    const stream = await this.studentService.getStudentProfilePicture(id);

    stream.pipe(res);
  }

  @Get(':id/cv')
  async getStudentCV(
    @Response() res: Res,
    @Param() { id }: FetchStudentParams,
  ): Promise<void> {
    const stream = await this.studentService.getStudentCV(id);

    stream.pipe(res);
  }

  @Get(':id/coverLetter')
  async getStudentCoverLetter(
    @Response() res: Res,
    @Param() { id }: FetchStudentParams,
  ): Promise<void> {
    const stream = await this.studentService.getStudentCoverLetter(id);

    stream.pipe(res);
  }

  @UseGuards(JwtStudentGuard)
  @Patch('me/updateStudent')
  async updateStudent(
    @Student() student: SafeStudent,
    @Body() dto: UpdateStudentDto,
  ): Promise<boolean> {
    return await this.studentService.updateStudent(student, dto);
  }

  @UseGuards(JwtStudentGuard)
  @Patch('me/skills')
  async updateSkills(
    @Student() student: SafeStudent,
    @Body() { skills }: UpdateSkillsDto,
  ): Promise<boolean> {
    return this.studentService.updateSkills(student, skills);
  }

  @UseGuards(JwtStudentGuard)
  @Patch('me/file/profilePicture')
  @UseInterceptors(FileInterceptor('uploadedFile'))
  async uploadProfilePicture(
    @Student() student: SafeStudent, //Front-End Interaction:
    @UploadedFile() uploadedFile: Express.Multer.File, //uploadedFile: [Insert File Here]

    /** If we add File Validation
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new FileTypeValidator({fileType: /.(jpg|jpeg|png|pdf|doc)$/}), 
          ]
        })
      ) uploadedFile: Express.Multer.File,
      */
  ): Promise<boolean> {
    return await this.studentService.uploadProfilePicture(
      student,
      uploadedFile,
    );
  }

  @UseGuards(JwtStudentGuard)
  @Patch('me/file/cv')
  @UseInterceptors(FileInterceptor('uploadedFile'))
  async uploadCV(
    @Student() student: SafeStudent, //Front-End Interaction:
    @UploadedFile() uploadedFile: Express.Multer.File, //uploadedFile: [Insert File Here]

    /** If we add File Validation
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new FileTypeValidator({fileType: /.(jpg|jpeg|png|pdf|doc)$/}), 
          ]
        })
      ) uploadedFile: Express.Multer.File,
      */
  ): Promise<boolean> {
    return await this.studentService.uploadCV(student, uploadedFile);
  }

  @UseGuards(JwtStudentGuard)
  @Patch('me/file/coverLetter')
  @UseInterceptors(FileInterceptor('uploadedFile'))
  async uploadCoverLetter(
    @Student() student: SafeStudent, //Front-End Interaction:
    @UploadedFile() uploadedFile: Express.Multer.File, //uploadedFile: [Insert File Here]

    /** If we add File Validation
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new FileTypeValidator({fileType: /.(jpg|jpeg|png|pdf|doc)$/}), 
          ]
        })
      ) uploadedFile: Express.Multer.File,
      */
  ): Promise<boolean> {
    return await this.studentService.uploadCoverLetter(student, uploadedFile);
  }

  @UseGuards(JwtStudentGuard)
  @Post('/me/favourites')
  addPostToFavourites(
    @Student() student: SafeStudent,
    @Body() { postId }: AddPostToFavouritesDto,
  ): Promise<boolean> {
    return this.studentService.addPostToFavourites(student, postId);
  }

  @UseGuards(JwtStudentGuard)
  @Delete('/me/favourites')
  deletePostToFavourites(
    @Student() student: SafeStudent,
    @Body() { postId }: AddPostToFavouritesDto,
  ): Promise<boolean> {
    return this.studentService.deletePostToFavourites(student, postId);
  }

  @UseGuards(JwtStudentGuard)
  @Get('/me/favourites')
  getFavouritesLists(
    @Student() student: SafeStudent,
  ): Promise<JobPostDetails[]> {
    return this.studentService.getFavouritesLists(student);
  }
}
