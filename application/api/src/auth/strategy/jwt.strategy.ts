import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SafeAdministrator } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { SafeCompany } from 'src/company/company.dto';
import { CompanyService } from 'src/company/company.service';
import {
  JWT_ADMIN_SECRET,
  JWT_COMPANY_SECRET,
  JWT_STUDENT_SECRET,
} from 'src/config/env';
import { SafeStudent } from 'src/student/student.dto';
import { StudentService } from 'src/student/student.service';
import { JwtPayload } from '../auth.dto';

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(
  Strategy,
  'student-jwt',
) {
  constructor(private studentService: StudentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_STUDENT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<SafeStudent> {
    const student = await this.studentService.findStudentById(payload.sub);

    if (!student) {
      throw new UnauthorizedException();
    }

    const { password: _, ...info } = student;

    return info;
  }
}

@Injectable()
export class CompanyJwtStrategy extends PassportStrategy(
  Strategy,
  'company-jwt',
) {
  constructor(private companyService: CompanyService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_COMPANY_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<SafeCompany> {
    const company = await this.companyService.findCompanyById(payload.sub);

    if (!company) {
      throw new UnauthorizedException();
    }

    const { password: _, ...info } = company;

    return info;
  }
}

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_ADMIN_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<SafeAdministrator> {
    const admin = await this.adminService.findAdminById(payload.sub);

    if (!admin) {
      throw new UnauthorizedException();
    }

    const { password: _, ...info } = admin;

    return info;
  }
}
