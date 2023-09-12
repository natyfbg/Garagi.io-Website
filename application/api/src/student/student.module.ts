import { Module } from '@nestjs/common';
import { JobPostModule } from 'src/post/job-post.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [PrismaModule, JobPostModule],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
