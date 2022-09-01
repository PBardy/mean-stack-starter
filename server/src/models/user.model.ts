import { IModel, ISoftDeletes, ITimeStamps } from '@/interfaces/model.interface';
import { IBaseUser } from '@/interfaces/user.interface';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Model, ModelObject, RelationMappings } from 'objection';
import { PermissionGroup } from './permission-group.model';
import { Permission } from './permission.model';
import { Role } from './role.model';

export class User extends Model implements IModel, ISoftDeletes, ITimeStamps, IBaseUser {
  public id: number;
  public roleId: number;
  public uuid: string;
  public email: string;
  public fullName: string;
  public password: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public role?: Role;

  public static idColumn = 'id';
  public static tableName = 'users';

  public static relationMappings: RelationMappings = {
    role: {
      modelClass: Role,
      relation: Model.HasOneRelation,
      join: {
        from: 'users.roleId',
        to: 'roles.id',
      },
    },
    permissions: {
      modelClass: Permission,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        through: {
          from: 'user_permissions.userId',
          to: 'user_permissions.permissionId',
        },
        to: 'permissions.id',
      },
    },
    permissionGroups: {
      modelClass: PermissionGroup,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        through: {
          from: 'user_permission_groups.userId',
          to: 'user_permission_groups.permissionGroupId',
        },
        to: 'permission_groups.id',
      },
    },
  };

  public async $beforeInsert(): Promise<void> {
    this.uuid = randomUUID();
    this.password = await hash(this.password, 10);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserShape = ModelObject<User>;
