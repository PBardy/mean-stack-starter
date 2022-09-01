import { ForgotPasswordEmailDto } from '@/dtos/auth/ForgotPasswordEmail.dto';
import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { assertIsNotEmpty, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';
import { EmailService } from './email.service';
import { UserService } from './user.service';

export class PasswordService extends BaseService {
  protected userService = new UserService();
  protected emailService = new EmailService();

  private async generateRecoveryCode(): Promise<string> {
    return 'XDES';
  }

  public async forgotPassword(dto: ForgotPasswordRequestDto): Promise<void> {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getByEmail(dto.email);
    await assertModelExists(user);

    const recoveryCode = await this.generateRecoveryCode();

    const emailDto = new ForgotPasswordEmailDto({
      user,
      recoveryCode,
    });

    await this.emailService.sendForgotPasswordEmail(emailDto);
  }
}
