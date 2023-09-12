import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobPostController } from './job-post.controller';
import { JobPostService } from './job-post.service';

@Module({
  imports: [PrismaModule],
  providers: [JobPostService],
  controllers: [JobPostController],
  exports: [JobPostService],
})
export class JobPostModule {}
