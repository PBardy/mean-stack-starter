import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class SignInRequestDto extends BaseDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  public static fromJson(json: Record<string, any>): SignInRequestDto {
    const dto = new SignInRequestDto();
    dto.email = json['email'];
    dto.password = json['password'];

    return dto;
  }
}
