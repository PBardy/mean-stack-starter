import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { assertIsNotEmpty, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';
import { EmailService } from './email.service';
import { UserService } from './user.service';
import { UserRecoveryCodeService } from './user-recovery-code.service';
import { UserRecoveryCodeDto } from '@/dtos/user-recovery-code/user-recovery-code.dto';
import { UserRecoveryCodeShape } from '@/models/user-recovery-code.model';
import { RecoverAccountRequestDto } from '@/dtos/auth/RecoverAccountRequest.dto';
import { User } from '@/models/user.model';
import { ResetPasswordRequestDto } from '@/dtos/auth/ResetPasswordRequest.dto';

export class PasswordService extends BaseService {
  protected userService = new UserService();
  protected emailService = new EmailService();
  protected userRecoveryCodeService = new UserRecoveryCodeService();

  public async resetPassword(userId: number, dto: ResetPasswordRequestDto): Promise<User> {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getById(userId);
    await assertModelExists(user);
    await user.$query().update({ password: dto.newPassword });

    return user;
  }

  public async forgotPassword(dto: ForgotPasswordRequestDto): Promise<void> {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getByEmail(dto.email);
    await assertModelExists(user);

    const code = await this.userRecoveryCodeService.createOne(user);
    await assertModelExists(code);

    await this.emailService.sendForgotPasswordEmail(UserRecoveryCodeDto.fromModel(code as UserRecoveryCodeShape));
  }

  public async recoverAccount(dto: RecoverAccountRequestDto): Promise<User> {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getByEmail(dto.email);
    await assertModelExists(user);

    const code = await this.userRecoveryCodeService.getOne(user.id, dto.code);
    await assertModelExists(code);

    return user;
  }
}
