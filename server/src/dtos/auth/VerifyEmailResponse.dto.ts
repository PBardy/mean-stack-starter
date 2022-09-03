import { IsBoolean } from 'class-validator';
import { BaseDto } from '../base.dto';

export class VerifyEmailResponseDto extends BaseDto {
  @IsBoolean()
  public success: boolean;

  public static fromJson(json: Record<string, any>): VerifyEmailResponseDto {
    const dto = new VerifyEmailResponseDto();
    dto.success = json['success'];

    return dto;
  }
}
