import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class SignUpRequestDto extends BaseDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullName: string;

  public static fromJson(json: Record<string, any>): SignUpRequestDto {
    const dto = new SignUpRequestDto();
    dto.email = json['email'];
    dto.fullName = json['fullName'];
    dto.password = json['password'];

    return dto;
  }
}
