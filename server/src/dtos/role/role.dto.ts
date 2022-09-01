import { RoleEnum } from '@/enums/role.enum';
import { RoleShape } from '@/models/role.model';
import { IsEnum } from 'class-validator';
import { PropertyDto } from '../property.dto';

export class RoleDto extends PropertyDto {
  @IsEnum(RoleEnum)
  public tag: RoleEnum;

  public static fromModel(model: RoleShape): RoleDto {
    return new RoleDto(model);
  }

  public static fromModels(models: RoleShape[]): RoleDto[] {
    return models.map(model => RoleDto.fromModel(model));
  }
}
