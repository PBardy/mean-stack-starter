import { TokenData } from '@/interfaces/auth.interface';
import { IsObject } from 'class-validator';
import { BaseDto } from '../base.dto';
import { UserDto } from '../user/user.dto';

type Props = {
  user: UserDto;
  token: TokenData;
};

export class EmailConfirmationEmailDto extends BaseDto {
  @IsObject()
  public readonly user: UserDto;

  @IsObject()
  public readonly token: TokenData;

  public constructor({ user, token }: Props) {
    super();

    this.user = user;
    this.token = token;
  }
}
