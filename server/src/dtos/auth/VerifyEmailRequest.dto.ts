import { IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class VerifyEmailRequestDto extends BaseDto {
  @IsString()
  public email: string;

  @IsString()
  public token: string;

  public static fromJson(json: Record<string, any>): VerifyEmailRequestDto {
    const dto = new VerifyEmailRequestDto();
    dto.email = json['email'];
    dto.token = json['token'];

    return dto;
  }
}
