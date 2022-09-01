import { IsOptional, IsString } from 'class-validator';
import { ModelDto } from '../model.dto';

export class PatchUserDto extends ModelDto {
  @IsString()
  @IsOptional()
  public readonly email: string;

  @IsString()
  @IsOptional()
  public readonly fullName: string;
}
