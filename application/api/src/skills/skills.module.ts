import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SkillController } from './skills.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SkillController],
})
export class SkillModule {}
