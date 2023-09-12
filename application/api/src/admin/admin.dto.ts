import { ApiProperty } from '@nestjs/swagger';
import { Administrator } from '@prisma/client';
import { IsUUID } from 'class-validator';

export type SafeAdministrator = Omit<Administrator, 'password'>;

export class SendJobAlertParams {
  @ApiProperty()
  @IsUUID()
  id: string;
}
