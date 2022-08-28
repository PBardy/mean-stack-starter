import { UserShape } from '@/models/user.model';
import { IsString } from 'class-validator';
import { ModelDto } from '../model.dto';

export class UserDto extends ModelDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly fullName: string;

  public constructor(user: UserShape) {
    super(user);

    this.email = user.email;
    this.fullName = user.fullName;
  }

  public static fromModel(user: UserShape): UserDto {
    return new UserDto(user);
  }

  public static fromModels(users: UserShape[]): UserDto[] {
    return users.map(UserDto.fromModel);
  }
}
