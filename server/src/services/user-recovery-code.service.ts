import { UserRecoveryCode } from '@/models/user-recovery-code.model';
import { User } from '@/models/user.model';
import { BaseService } from './base.service';

export class UserRecoveryCodeService extends BaseService {
  public async getOne(userId: number, code: string): Promise<UserRecoveryCode> {
    return await UserRecoveryCode.query().where('userId', userId).andWhere('code', code).first();
  }

  public async createOne(user: User): Promise<UserRecoveryCode> {
    const code = await UserRecoveryCode.query().insertAndFetch({
      userId: user.id,
    });

    return await UserRecoveryCode.query().findById(code.id).withGraphJoined('user').withGraphJoined('user.role').skipUndefined();
  }
}
