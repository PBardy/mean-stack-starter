import { IModel, ISoftDeletes, ITimeStamps } from '@/interfaces/model.interface';
import { IBaseUser } from '@/interfaces/user.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject, RelationMappings } from 'objection';
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

  public static idColumn = 'id';
  public static tableName = 'users';

  public static relationMappings: RelationMappings = {
    role: {
      modelClass: Role,
      relation: Model.HasOneRelation,
      join: {
        from: 'users.role_id',
        to: 'roles.id',
      },
    },
    permissions: {
      modelClass: Permission,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        through: {
          from: 'user_permissions.user_id',
          to: 'user_permissions.permission_id',
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

export type UserShape = ModelObject<User>;
