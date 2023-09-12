import { Module } from '@nestjs/common';
import { MailModule } from 'src/integrations/sendinblue/sendinblue.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentModule } from 'src/student/student.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, StudentModule, MailModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
