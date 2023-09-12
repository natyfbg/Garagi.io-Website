import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { CompanyModule } from 'src/company/company.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentModule } from 'src/student/student.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AdminJwtStrategy,
  CompanyJwtStrategy,
  StudentJwtStrategy,
} from './strategy/jwt.strategy';
import {
  LocalAdministratorStrategy,
  LocalCompanyStrategy,
  LocalStudentStrategy,
} from './strategy/local.strategy';

@Module({
  imports: [
    PrismaModule,
    StudentModule,
    AdminModule,
    CompanyModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    AdminJwtStrategy,
    StudentJwtStrategy,
    CompanyJwtStrategy,
    LocalStudentStrategy,
    LocalCompanyStrategy,
    LocalAdministratorStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
