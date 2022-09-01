import { UserRecoveryCodeShape } from '@/models/user-recovery-code.model';
import { UserShape } from '@/models/user.model';
import { IsObject, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';
import { UserDto } from '../user/user.dto';

export class UserRecoveryCodeDto extends BaseDto {
  @IsString()
  public readonly code: string;

  @IsString()
  public readonly validUntil: string;

  @IsObject()
  public readonly user: UserDto;

  public constructor(model: UserRecoveryCodeShape) {
    super();

    this.code = model.code;
    this.validUntil = model.validUntil;
    this.user = UserDto.fromModel(model.user as UserShape);
  }

  public static fromModel(model: UserRecoveryCodeShape): UserRecoveryCodeDto {
    return new UserRecoveryCodeDto(model);
  }

  public static fromModels(models: UserRecoveryCodeShape[]): UserRecoveryCodeDto[] {
    return models.map(UserRecoveryCodeDto.fromModel);
  }
}
