import { VerifyEmailRequestDto } from '@/dtos/auth/VerifyEmailRequest.dto';
import { UserVerfication } from '@/models/user-verification.model';
import { assertIsNotEmpty, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class VerificationService extends BaseService {
  protected userService = new UserService();

  public async getOne(email: string, token: string) {
    return await UserVerfication.query().where('email', email).andWhere('token', token).first();
  }

  public async createOne(email: string) {
    const verification = await UserVerfication.query().insertAndFetch({
      email,
    });

    return verification;
  }

  public async verifyEmail(dto: VerifyEmailRequestDto) {
    await assertIsNotEmpty(dto);

    const verification = await this.getOne(dto.email, dto.token);
    await assertModelExists(verification);

    const user = await this.userService.getByEmail(dto.email);
    await assertModelExists(user);

    await verification.$query().delete();
    await user.$query().update({ emailVerifiedAt: new Date().toISOString() });
  }
}
