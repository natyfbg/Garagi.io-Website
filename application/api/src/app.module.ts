import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JobPostModule } from './post/job-post.module';
import { SearchModule } from './search/search.module';
import { SkillModule } from './skills/skills.module';

@Module({
  imports: [AuthModule, SearchModule, JobPostModule, SkillModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
