import { ForgotPasswordEmailDto } from '@/dtos/emails/ForgotPasswordEmail.dto';
import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { assertIsNotEmpty, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';
import { EmailService } from './email.service';
import { UserService } from './user.service';
import { UserDto } from '@/dtos/user/user.dto';
import { UserShape } from '@/models/user.model';

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

    const code = await this.generateRecoveryCode();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 2);

    const emailDto = new ForgotPasswordEmailDto({
      code,
      expiry,
      user: UserDto.fromModel(user as UserShape),
    });

    await this.emailService.sendForgotPasswordEmail(emailDto);
  }
}
