import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Administrator, Company, Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateCompanyDto, CreateStudentDto, JwtToken } from './auth.dto';
import { SafeCompany } from 'src/company/company.dto';
import { SafeStudent } from 'src/student/student.dto';
import { SafeAdministrator } from 'src/admin/admin.dto';
import {
  JWT_ADMIN_SECRET,
  JWT_COMPANY_SECRET,
  JWT_STUDENT_SECRET,
} from 'src/config/env';
import { StudentService } from 'src/student/student.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
    private readonly companyService: CompanyService,
  ) {}

  async validateCompany(
    email: string,
    password: string,
  ): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { email },
    });

    if (company && (await bcrypt.compare(password, company.password))) {
      return company;
    }

    return null;
  }

  async validateStudent(
    email: string,
    password: string,
  ): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: { email },
    });

    if (student && (await bcrypt.compare(password, student.password))) {
      return student;
    }

    return null;
  }

  async validateAdmnistrator(
    username: string,
    password: string,
  ): Promise<Administrator | null> {
    const admin = await this.prisma.administrator.findUnique({
      where: { username },
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }

    return null;
  }

  // LOGIN

  async loginStudent(student: SafeStudent): Promise<JwtToken> {
    return {
      accessToken: await this.jwtService.signAsync(
        {
          sub: student.id,
        },
        {
          secret: JWT_STUDENT_SECRET,
          expiresIn: '1d',
        },
      ),
    };
  }

  async loginCompany(company: SafeCompany): Promise<JwtToken> {
    return {
      accessToken: await this.jwtService.signAsync(
        {
          sub: company.id,
        },
        {
          secret: JWT_COMPANY_SECRET,
          expiresIn: '1d',
        },
      ),
    };
  }

  async loginAdmin(admin: SafeAdministrator): Promise<JwtToken> {
    return {
      accessToken: await this.jwtService.signAsync(
        {
          sub: admin.id,
        },
        {
          secret: JWT_ADMIN_SECRET,
          expiresIn: '1d',
        },
      ),
    };
  }

  // REGISTER

  async registerStudent(dto: CreateStudentDto): Promise<JwtToken> {
    const check = await this.studentService.findStudentByEmail(dto.email);

    if (check) {
      throw new ConflictException('STUDENT_EXISTS');
    }

    const student = await this.studentService.createStudent(dto);
    const payload = {
      sub: student.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: JWT_STUDENT_SECRET,
        expiresIn: '1d',
      }),
    };
  }

  async registerCompany(dto: CreateCompanyDto): Promise<JwtToken> {
    const check = await this.studentService.findStudentByEmail(dto.email);

    if (check) {
      throw new ConflictException('COMPANY_EXISTS');
    }

    const company = await this.companyService.createCompany(dto);
    const payload = {
      sub: company.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: JWT_COMPANY_SECRET,
        expiresIn: '1d',
      }),
    };
  }
}
