import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailService } from './sendinblue.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://api.sendinblue.com',
      headers: {
        Accept: 'application/json',
        'api-key': '',
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
