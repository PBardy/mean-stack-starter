import { IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class ResetPasswordRequestDto extends BaseDto {
  @IsString()
  public newPassword: string;
}
