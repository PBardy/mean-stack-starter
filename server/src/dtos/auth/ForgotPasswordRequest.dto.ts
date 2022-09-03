import { IsEmail } from 'class-validator';
import { BaseDto } from '../base.dto';

export class ForgotPasswordRequestDto extends BaseDto {
  @IsEmail()
  public readonly email: string;

  public constructor(email: string) {
    super();

    this.email = email;
  }

  public static fromJson(json: Record<string, any>): ForgotPasswordRequestDto {
    const email = json['email'];

    return new ForgotPasswordRequestDto(email);
  }
}
