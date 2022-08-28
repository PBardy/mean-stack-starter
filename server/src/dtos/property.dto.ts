import { IsString } from 'class-validator';
import { ModelDto } from './model.dto';

export class PropertyDto extends ModelDto {
  @IsString()
  public readonly tag: Uppercase<string>;

  @IsString()
  public readonly label: string;

  @IsString()
  public readonly description: string;
}
