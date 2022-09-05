import { PermissionGroupEnum } from '@/enums/permission-group.enum';
import { PermissionGroupShape } from '@/models/permission-group.model';
import { IsEnum } from 'class-validator';
import { PropertyDto } from '../property.dto';

export class PermissionGroupDto extends PropertyDto {
  @IsEnum(PermissionGroupEnum)
  public tag: PermissionGroupEnum;

  public static fromModel(model: PermissionGroupShape) {
    return new PermissionGroupDto(model);
  }

  public static fromModels(models: PermissionGroupShape[]) {
    return models.map(PermissionGroupDto.fromModel);
  }
}
