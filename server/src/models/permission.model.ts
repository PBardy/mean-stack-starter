import { PermissionEnum } from '@/enums/permission.enum';
import { IModel, ISoftDeletes, ITimeStamps } from '@/interfaces/model.interface';
import { IPermission } from '@/interfaces/property.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject } from 'objection';

export class Permission extends Model implements IModel, ISoftDeletes, ITimeStamps, IPermission {
  public id: number;
  public uuid: string;
  public tag: PermissionEnum;
  public label: string;
  public description: string;
  public protected: boolean;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public static idColumn = 'id';
  public static tableName = 'permissions';

  public $beforeInsert(): void {
    this.uuid = randomUUID();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export type PermissionsShape = ModelObject<Permission>;
