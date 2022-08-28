import { IsBoolean } from 'class-validator';
import { BaseDto } from '../base.dto';

export class SignOutResponseDto extends BaseDto {
  @IsBoolean()
  public readonly success: boolean;

  public constructor(success: boolean) {
    super();

    this.success = success;
  }
}
