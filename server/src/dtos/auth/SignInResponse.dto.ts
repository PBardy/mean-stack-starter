import { UserShape } from '@/models/user.model';
import { IsObject, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';
import { UserDto } from '../user/user.dto';

export class SignInResponseDto extends BaseDto {
  @IsObject()
  public readonly user: UserDto;

  @IsString()
  public readonly token: string;

  public constructor(user: UserShape, token: string) {
    super();

    this.user = UserDto.fromModel(user);
    this.token = token;
  }
}
