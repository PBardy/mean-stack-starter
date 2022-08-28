import { IsEmail, IsString } from 'class-validator';
import { SignUpRequestDto } from '../auth/SignUpRequest.dto';
import { BaseDto } from '../base.dto';

export class CreateUserDto extends BaseDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullName: string;

  public static fromJson(json: Record<string, any>): CreateUserDto {
    const dto = new CreateUserDto();
    dto.email = json['email'];
    dto.password = json['password'];
    dto.fullName = json['fullName'];

    return dto;
  }

  public static fromSignUpRequest(request: SignUpRequestDto): CreateUserDto {
    const dto = new CreateUserDto();
    dto.email = request.email;
    dto.password = request.password;
    dto.fullName = request.fullName;

    return dto;
  }
}
