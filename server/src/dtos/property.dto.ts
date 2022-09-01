import { IModel } from '@/interfaces/model.interface';
import { IProperty } from '@/interfaces/property.interface';
import { IsString } from 'class-validator';
import { ModelDto } from './model.dto';

export class PropertyDto extends ModelDto {
  @IsString()
  public readonly label: string;

  @IsString()
  public readonly description: string;

  public constructor(property: IProperty & IModel) {
    super(property);

    this.label = property.label;
    this.description = property.description;
  }
}
