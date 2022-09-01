import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { assertIsNotEmpty } from '@/utils/asserts';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class PasswordService extends BaseService {
  protected userService = new UserService();

  public async forgotPassword(dto: ForgotPasswordRequestDto): Promise<void> {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getByEmail(dto.email);
  }
}
