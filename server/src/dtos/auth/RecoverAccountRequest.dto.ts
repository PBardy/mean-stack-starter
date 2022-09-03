import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class RecoverAccountRequestDto extends BaseDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly code: string;
}
