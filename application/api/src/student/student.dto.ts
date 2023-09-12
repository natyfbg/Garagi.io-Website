import { Student } from '@prisma/client';
import { FetchJobPostParams } from 'src/post/job-post.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export type SafeStudent = Omit<Student, 'password'>;

export class UpdateStudentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  jobAlert?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  jobAlterTrigger?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ig?: string;
}

export class UpdateSkillsDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];
}

export class AddPostToFavouritesDto {
  @ApiProperty()
  @IsUUID()
  postId: string;
}

export class DeletePostFromFavouritesDto extends AddPostToFavouritesDto {}

export class FetchStudentParams extends FetchJobPostParams {}
