import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SafeAdministrator } from 'src/admin/admin.dto';
import { SafeCompany } from 'src/company/company.dto';
import { SafeStudent } from 'src/student/student.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStudentStrategy extends PassportStrategy(
  Strategy,
  'local-student',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<SafeStudent> {
    const student = await this.authService.validateStudent(email, password);

    if (!student) {
      throw new UnauthorizedException('STUDENT_LOGIN_FAILED');
    }

    return student;
  }
}

@Injectable()
export class LocalCompanyStrategy extends PassportStrategy(
  Strategy,
  'local-company',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<SafeCompany> {
    const company = await this.authService.validateCompany(email, password);

    if (!company) {
      throw new UnauthorizedException('COMPANY_LOGIN_FAILED');
    }

    return company;
  }
}

@Injectable()
export class LocalAdministratorStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<SafeAdministrator> {
    const admin = await this.authService.validateAdmnistrator(
      username,
      password,
    );

    if (!admin) {
      throw new UnauthorizedException('ADMIN_LOGIN_FAILED');
    }

    return admin;
  }
}
