import { Module } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { GnosysMailService } from './mail.service';

@Module({
  controllers: [],
  providers: [MailService, GnosysMailService],
  exports: [GnosysMailService],
})
export class MailModule {}
