import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Company } from '@prisma/client';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { FetchJobPostParams } from 'src/post/job-post.dto';

export type SafeCompany = Omit<Company, 'password'>;

export class SetStateApplicationDto {
  @ApiProperty()
  @IsUUID()
  studentId: string;

  @ApiProperty()
  @IsBoolean()
  rejected: boolean;
}

export class UpdateCompanyDto {
  @ApiPropertyOptional()
  @IsOptional()
  description?: string;
}

export class FetchCompanyParams extends FetchJobPostParams {}
