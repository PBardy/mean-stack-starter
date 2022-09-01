import { IsString } from 'class-validator';
import { ModelDto } from '../model.dto';

export class UpdateUserDto extends ModelDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly fullName: string;
}
