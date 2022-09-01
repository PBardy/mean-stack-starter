import Email from 'email-templates';
import { User } from '@/models/user.model';
import { BaseService } from './base.service';
import { MAIL_FROM, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '@config';
import { ForgotPasswordEmailDto } from '@/dtos/auth/ForgotPasswordEmail.dto';

const NodeMailer = require('nodemailer');

export class EmailService extends BaseService {
  private getTransport() {
    return NodeMailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  public async sendForgotPasswordEmail(dto: ForgotPasswordEmailDto) {
    /*
    await this.getTransport().sendMail({
      from: MAIL_FROM,
      to: dto.user.email,
      subject: 'Test Nodemailer with Mailtrap',
      html: '<h1>Attachments</h1>',
    });
    */

    const email = new Email({
      message: {
        from: MAIL_FROM,
      },
      send: true,
      transport: {
        tls: true,
        ssl: false,
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      },
    });

    await email.send({
      template: 'forgot-password',
      message: {
        to: dto.user.email,
      },
      locals: {
        name: dto.user.fullName,
      },
    });
  }
}
