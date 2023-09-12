import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalStudentGuard extends AuthGuard('local-student') {}

@Injectable()
export class LocalCompanyGuard extends AuthGuard('local-company') {}

@Injectable()
export class LocalAdminGuard extends AuthGuard('local-admin') {}
