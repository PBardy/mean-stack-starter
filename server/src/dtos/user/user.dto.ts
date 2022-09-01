import { UserShape } from '@/models/user.model';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { ModelDto } from '../model.dto';
import { RoleDto } from '../role/role.dto';

export class UserDto extends ModelDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly fullName: string;

  @IsObject()
  @IsOptional()
  public readonly role: RoleDto;

  public constructor(user: UserShape) {
    super(user);

    this.email = user.email;
    this.fullName = user.fullName;
    this.role = RoleDto.fromModel(user.role);
  }

  public static fromModel(user: UserShape): UserDto {
    return new UserDto(user);
  }

  public static fromModels(users: UserShape[]): UserDto[] {
    return users.map(UserDto.fromModel);
  }
}
