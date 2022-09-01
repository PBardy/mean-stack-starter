import { IsDate, IsObject, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';
import { UserDto } from '../user/user.dto';

type Props = {
  user: UserDto;
  code: string;
  expiry: Date;
};

export class ForgotPasswordEmailDto extends BaseDto {
  @IsObject()
  public readonly user: UserDto;

  @IsString()
  public readonly code: string;

  @IsDate()
  public readonly expiry: Date;

  public constructor({ user, code, expiry }: Props) {
    super();

    this.user = user;
    this.code = code;
    this.expiry = expiry;
  }
}
