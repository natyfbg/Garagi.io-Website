import { Controller, Get } from '@nestjs/common';
import { Skill } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/skills')
export class SkillController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('')
  async getSkills(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }
}
