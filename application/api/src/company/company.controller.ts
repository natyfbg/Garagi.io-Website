import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { JobApplication, JobPost } from '@prisma/client';
import { Company } from 'src/auth/auth.decorator';
import { JwtCompanyGuard } from 'src/auth/guards/jwt.guard';
import { FetchJobPostParams } from 'src/post/job-post.dto';
import {
  FetchCompanyParams,
  SafeCompany,
  SetStateApplicationDto,
  UpdateCompanyDto,
} from './company.dto';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtCompanyGuard)
  @Get('me')
  async me(@Company() company: SafeCompany): Promise<SafeCompany> {
    return company;
  }

  @UseGuards(JwtCompanyGuard)
  @Patch('me')
  async updateCompany(
    @Company() company: SafeCompany,
    @Body() dto: UpdateCompanyDto,
  ): Promise<SafeCompany> {
    return this.companyService.updateCompany(company, dto);
  }

  @UseGuards(JwtCompanyGuard)
  @Get('me/posts')
  async getLoggedInCompanyPosts(
    @Company() company: SafeCompany,
  ): Promise<JobPost[]> {
    return this.companyService.getCompanyPosts(company);
  }

  @UseGuards(JwtCompanyGuard)
  @Delete('me/posts/:id')
  async removeCompanyPost(
    @Company() company: SafeCompany,
    @Param() { id }: FetchJobPostParams,
  ): Promise<boolean> {
    return this.companyService.removeCompanyPost(company, id);
  }

  @UseGuards(JwtCompanyGuard)
  @Get('me/posts/:id/applications')
  async getPostApplications(
    @Company() company: SafeCompany,
    @Param() { id }: FetchJobPostParams,
  ): Promise<JobApplication[]> {
    return this.companyService.getJobPostApplications(company, id);
  }

  @UseGuards(JwtCompanyGuard)
  @Get('me/posts/applications')
  async getCompanyJobApplications(
    @Company() company: SafeCompany,
  ): Promise<JobApplication[]> {
    return this.companyService.getJobApplications(company);
  }


  @UseGuards(JwtCompanyGuard)
  @Post('me/posts/:id/applications')
  async setStateJobApplication(
    @Company() company: SafeCompany,
    @Param() { id }: FetchJobPostParams,
    @Body() dto: SetStateApplicationDto,
  ): Promise<JobApplication> {
    return this.companyService.setStateJobApplication(company, id, dto);
  }

  @Get(':id/logo')
  async getCompanyLogo(
    @Response() res: Res,
    @Param() { id }: FetchCompanyParams,
  ): Promise<void> {
    const stream = await this.companyService.getCompanyLogo(id);

    stream.pipe(res);
  }

  @UseGuards(JwtCompanyGuard)
  @Patch('me/file/logo')
  @UseInterceptors(FileInterceptor('uploadedFile'))
  async uploadProfilePicture(
    @Company() company: SafeCompany,
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
    return await this.companyService.uploadLogo(company, uploadedFile);
  }
}
