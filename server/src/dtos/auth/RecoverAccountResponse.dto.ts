import { IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class RecoverAccountResponseDto extends BaseDto {
  @IsString()
  public token: string;

  public static fromJson(json: Record<string, any>): RecoverAccountResponseDto {
    const dto = new RecoverAccountResponseDto();
    dto.token = json['token'];

    return dto;
  }
}
