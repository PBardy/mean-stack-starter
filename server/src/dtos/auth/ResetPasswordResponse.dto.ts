import { IsObject, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';
import { UserDto } from '../user/user.dto';

type Props = {
  user: UserDto;
  token: string;
};

export class ResetPasswordResponseDto extends BaseDto {
  @IsObject()
  public readonly user: UserDto;

  @IsString()
  public readonly token: string;

  public constructor({ user, token }: Props) {
    super();

    this.user = user;
    this.token = token;
  }
}
