import { IModel, ISoftDeletes, ITimeStamps } from '@/interfaces/model.interface';
import { IProperty } from '@/interfaces/property.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject, RelationMappings } from 'objection';
import { Permission } from './permission.model';

export class PermissionGroup extends Model implements IModel, ISoftDeletes, ITimeStamps, IProperty {
  public id: number;
  public uuid: string;
  public tag: Uppercase<string>;
  public label: string;
  public description: string;
  public protected: boolean;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public static idColumn = 'id';
  public static tableName = 'permissions';

  public static relationMappings: RelationMappings = {
    permissions: {
      modelClass: Permission,
      relation: Model.HasManyRelation,
      join: {
        from: 'permission_groups.id',
        through: {
          from: 'permission_group_permissions.permission_group_id',
          to: 'permission_group_permissions.permission_id',
        },
        to: 'permissions.id',
      },
    },
  };

  public $beforeInsert(): void {
    this.uuid = randomUUID();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export type PermissionGroupShape = ModelObject<PermissionGroup>;
