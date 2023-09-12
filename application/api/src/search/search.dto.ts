import { JobArea, JobType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SearchJobsParams {
  @IsOptional()
  @IsString()
  q: string;

  @IsOptional()
  @IsArray()
  @IsEnum(JobArea, { each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split('|'))
  @ValidateIf((e) => !e)
  categories?: JobArea[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split('|'))
  companies?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(JobType, { each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split('|'))
  @ValidateIf((e) => !e)
  types?: JobType[];
}

export function stringToJobArea(type: string): JobArea {
  return JobArea[type];
}

export function stringToJobType(type: string): JobType {
  return JobType[type];
}
