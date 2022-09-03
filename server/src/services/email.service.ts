import path from 'path';
import { BaseService } from './base.service';
import { MAIL_FROM, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '@config';
import { EmailConfirmationEmailDto } from '@/dtos/emails/EmailConfirmationEmail.dto';
import { UserRecoveryCodeDto } from '@/dtos/user-recovery-code/user-recovery-code.dto';

const Email = require('email-templates');

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

  public async setEmailConfirmationEmail(dto: EmailConfirmationEmailDto) {
    await this.getEmail().send({
      template: path.join(__dirname, '../emails', 'email-confirmation'),
      message: {
        to: dto.user.email,
      },
      locals: {
        name: dto.user.fullName,
        link: dto.toLink(),
      },
    });
  }

  public async sendForgotPasswordEmail(code: UserRecoveryCodeDto) {
    await this.getEmail().send({
      template: path.join(__dirname, '../emails', 'forgot-password'),
      message: {
        to: code.user.email,
      },
      locals: {
        name: code.user.fullName,
        recoveryCode: code.code,
      },
    });
  }
}
