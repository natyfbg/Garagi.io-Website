import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SafeAdministrator } from 'src/admin/admin.dto';
import { SafeCompany } from 'src/company/company.dto';
import { SafeStudent } from 'src/student/student.dto';
import { Admin, Company, Student } from './auth.decorator';
import { CreateCompanyDto, CreateStudentDto, JwtToken } from './auth.dto';
import { AuthService } from './auth.service';
import {
  LocalAdminGuard,
  LocalCompanyGuard,
  LocalStudentGuard,
} from './guards/local.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('student/register')
  registerStudent(@Body() dto: CreateStudentDto): Promise<JwtToken> {
    return this.authService.registerStudent(dto);
  }

  @UseGuards(LocalStudentGuard)
  @Post('student/login')
  loginStudent(@Student() student: SafeStudent): Promise<JwtToken> {
    return this.authService.loginStudent(student);
  }

  @Post('company/register')
  registerCompany(@Body() dto: CreateCompanyDto): Promise<JwtToken> {
    return this.authService.registerCompany(dto);
  }

  @UseGuards(LocalCompanyGuard)
  @Post('company/login')
  loginCompany(@Company() company: SafeCompany): Promise<JwtToken> {
    return this.authService.loginCompany(company);
  }

  @UseGuards(LocalAdminGuard)
  @Post('admin/login')
  loginAdministrator(@Admin() admin: SafeAdministrator): Promise<JwtToken> {
    return this.authService.loginAdmin(admin);
  }
}
