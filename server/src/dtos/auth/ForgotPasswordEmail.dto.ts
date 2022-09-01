import { IsObject, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';
import { UserDto } from '../user/user.dto';

export class ForgotPasswordEmailDto extends BaseDto {
  @IsObject()
  public user: UserDto;

  @IsString()
  public recoveryCode: string;

  public constructor({ user, recoveryCode }) {
    super();

    this.user = user;
    this.recoveryCode = recoveryCode;
  }
}
