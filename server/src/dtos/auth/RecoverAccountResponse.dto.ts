import { IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class RecoverAccountResponseDto extends BaseDto {
  @IsString()
  public token: string;

  public constructor(token: string) {
    super();

    this.token = token;
  }
}
