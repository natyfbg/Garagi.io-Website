import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { JobPostDetails } from 'src/post/job-post.dto';

@Injectable()
export class MailService {
  constructor(private readonly httpService: HttpService) {}

  sendJobAlerts(
    email: string,
    jobAlertTrigger: string,
    jobPosts: JobPostDetails[],
  ): void {
    lastValueFrom(
      this.httpService.post('/v3/smtp/email', {
        to: [{ email }],
        templateId: 1,
        params: {
          trigger: jobAlertTrigger,
          posts: JSON.stringify(jobPosts),
        },
      }),
    );
  }
}
