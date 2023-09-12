import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Company, JobPost, Student } from '@prisma/client';
import { Admin } from 'src/auth/auth.decorator';
import { JwtAdminGuard } from 'src/auth/guards/jwt.guard';
import { SafeAdministrator, SendJobAlertParams } from './admin.dto';
import { AdminService } from './admin.service';

@UseGuards(JwtAdminGuard)
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('me')
  async me(@Admin() company: SafeAdministrator): Promise<SafeAdministrator> {
    return company;
  }

  @Get('students')
  fetchAllStudents(): Promise<Student[]> {
    return this.adminService.fetchAllStudents();
  }

  @Get('companies')
  fetchAllCompanies(): Promise<Company[]> {
    return this.adminService.fetchAllCompanies();
  }

  @Get('posts')
  fetchAllJobPosts(): Promise<JobPost[]> {
    return this.adminService.fetchAllJobPosts();
  }

  @Post(':id/alert')
  sendJobAlert(@Param() { id }: SendJobAlertParams): Promise<void> {
    return this.adminService.sendJobAlert(id);
  }
}
