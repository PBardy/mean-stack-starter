import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { assertIsNotEmpty, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';
import { EmailService } from './email.service';
import { UserService } from './user.service';
import { UserRecoveryCodeService } from './user-recovery-code.service';
import { UserRecoveryCodeDto } from '@/dtos/user-recovery-code/user-recovery-code.dto';
import { UserRecoveryCodeShape } from '@/models/user-recovery-code.model';

export class PasswordService extends BaseService {
  protected userService = new UserService();
  protected emailService = new EmailService();
  protected userRecoveryCodeService = new UserRecoveryCodeService();

  public async forgotPassword(dto: ForgotPasswordRequestDto): Promise<void> {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getByEmail(dto.email);
    await assertModelExists(user);

    const code = await this.userRecoveryCodeService.createOne(user);
    await assertModelExists(code);

    await this.emailService.sendForgotPasswordEmail(UserRecoveryCodeDto.fromModel(code as UserRecoveryCodeShape));
  }
}
