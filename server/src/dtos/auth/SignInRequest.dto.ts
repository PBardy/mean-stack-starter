import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class SignInRequestDto extends BaseDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  public constructor(email: string, password: string) {
    super();

    this.email = email;
    this.password = password;
  }

  public static fromJson(json: Record<string, any>): SignInRequestDto {
    const email = json['email'];
    const password = json['password'];

    return new SignInRequestDto(email, password);
  }
}
