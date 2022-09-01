import { IsEmail } from 'class-validator';
import { BaseDto } from '../base.dto';

export class ForgotPasswordRequestDto extends BaseDto {
  @IsEmail()
  public email: string;

  public static fromJson(json: Record<string, any>): ForgotPasswordRequestDto {
    const dto = new ForgotPasswordRequestDto();
    dto.email = json['email'];

    return dto;
  }
}
