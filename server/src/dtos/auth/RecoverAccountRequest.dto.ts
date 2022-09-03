import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class RecoverAccountRequestDto extends BaseDto {
  @IsEmail()
  public email: string;

  @IsString()
  public code: string;

  public static fromJson(json: Record<string, any>): RecoverAccountRequestDto {
    const dto = new RecoverAccountRequestDto();
    dto.email = json['email'];
    dto.code = json['code'];

    return dto;
  }
}
