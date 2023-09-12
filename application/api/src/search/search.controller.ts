import { Controller, Get, Query } from '@nestjs/common';
import { Company, JobArea, JobPost, JobType } from '@prisma/client';
import { SearchJobsParams } from './search.dto';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // EXAMPLE: /api/search?q=terms&categories=UI_UX|AR_VR&companies=Glowme&types=INTERSHIP
  @Get('jobs')
  async searchJobPosts(
    @Query() { q, categories, companies, types }: SearchJobsParams,
  ): Promise<(JobPost & { company: Company })[]> {
    categories = ((categories ?? []) as string[]).filter(
      (f) => f !== '',
    ) as JobArea[];
    types = ((types ?? []) as string[]).filter((f) => f !== '') as JobType[];

    return this.searchService.searchJobs(
      q ?? '',
      categories ?? [],
      companies ?? [],
      types ?? [],
    );
  }
}
