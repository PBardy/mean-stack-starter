import { RoleEnum } from '@/enums/role.enum';
import { IModel, ISoftDeletes, ITimeStamps } from '@/interfaces/model.interface';
import { IRole } from '@/interfaces/property.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject, RelationMappings } from 'objection';
import { PermissionGroup } from './permission-group.model';
import { Permission } from './permission.model';

export class Role extends Model implements IModel, ISoftDeletes, ITimeStamps, IRole {
  public id: number;
  public uuid: string;
  public tag: RoleEnum;
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
      relation: Model.HasOneThroughRelation,
      join: {
        from: 'roles.id',
        through: {
          from: 'role_permissions.roleId',
          to: 'role_permissions.permissionId',
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
