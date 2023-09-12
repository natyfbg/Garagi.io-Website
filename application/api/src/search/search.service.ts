import { Injectable } from '@nestjs/common';
import { Company, JobArea, JobPost, JobType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchJobs(
    q: string,
    categories: JobArea[],
    companies: string[],
    types: JobType[],
  ): Promise<(JobPost & { company: Company })[]> {
    const jobPosts = await this.prisma.jobPost.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
            },
          },
          {
            description: {
              contains: q,
            },
          },
        ],
        AND: [
          {
            OR: categories.map((category) => ({
              category,
            })),
          },
          {
            OR: types.map((type) => ({
              type,
            })),
          },
          {
            OR: companies.map((name) => ({
              company: {
                name,
              },
            })),
          },
        ],
      },
      include: {
        company: true,
      },
    });

    return jobPosts;
  }
}
