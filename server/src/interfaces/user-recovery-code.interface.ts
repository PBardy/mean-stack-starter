import { User } from '@/models/user.model';

export interface IBaseUserRecoveryCode {
  userId: number;
  code: string;
  validUntil: string;
}

export interface IUserRecoveryCode extends IBaseUserRecoveryCode {
  user: User;
}
