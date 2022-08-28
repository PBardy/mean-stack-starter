import { IModel, ISoftDeletes, ITimeStamps } from '@/interfaces/model.interface';
import { IProperty } from '@/interfaces/property.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject, RelationMappings } from 'objection';
import { Permission } from './permission.model';

export class Role extends Model implements IModel, ISoftDeletes, ITimeStamps, IProperty {
  public id: number;
  public uuid: string;
  public tag: Uppercase<string>;
  public label: string;
  public protected: boolean;
  public description: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public static idColumn = 'id';
  public static tableName = 'roles';

  public static relationMappings: RelationMappings = {
    permissions: {
      modelClass: Permission,
      relation: Model.HasManyRelation,
      join: {
        from: 'roles.id',
        through: {
          from: 'role_permissions.role_id',
          to: 'role_permissions.permission_id',
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

export type RoleShape = ModelObject<Role>;
