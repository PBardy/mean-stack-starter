import { User } from '@/models/user.model';
import { BaseService } from './base.service';
import { MAIL_FROM, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '@config';
import { ForgotPasswordEmailDto } from '@/dtos/auth/ForgotPasswordEmail.dto';
import path from 'path';

const Email = require('email-templates');
const NodeMailer = require('nodemailer');

export class EmailService extends BaseService {
  private getEmail() {
    return new Email({
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
  }

  public async sendForgotPasswordEmail(dto: ForgotPasswordEmailDto) {
    await this.getEmail().send({
      template: path.join(__dirname, '../emails', 'forgot-password'),
      message: {
        to: dto.user.email,
      },
      locals: {
        name: dto.user.fullName,
        recoveryCode: dto.recoveryCode,
      },
    });
  }
}
