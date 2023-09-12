import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { SafeAdministrator } from 'src/admin/admin.dto';
import { SafeCompany } from 'src/company/company.dto';
import { SafeStudent } from 'src/student/student.dto';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = SetMetadata(IS_PUBLIC_KEY, true);

export const Student = createParamDecorator(
  (_, ctx: ExecutionContext) =>
    (ctx.switchToHttp().getRequest() as { user: SafeStudent }).user,
);

export const Company = createParamDecorator(
  (_, ctx: ExecutionContext) =>
    (ctx.switchToHttp().getRequest() as { user: SafeCompany }).user,
);

export const Admin = createParamDecorator(
  (_, ctx: ExecutionContext) =>
    (ctx.switchToHttp().getRequest() as { user: SafeAdministrator }).user,
);
