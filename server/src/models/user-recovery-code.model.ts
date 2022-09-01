import { IModel, ITimeStamps } from '@/interfaces/model.interface';
import { IBaseUserRecoveryCode } from '@/interfaces/user-recovery-code.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject, RelationMappings } from 'objection';
import { User } from './user.model';

export class UserRecoveryCode extends Model implements IModel, ITimeStamps, IBaseUserRecoveryCode {
  public id: number;
  public code: string;
  public uuid: string;
  public userId: number;
  public validUntil: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public user?: User;

  public static idColumn = 'id';
  public static tableName = 'user_recovery_codes';

  public static relationMappings: RelationMappings = {
    user: {
      modelClass: User,
      relation: Model.HasOneRelation,
      join: {
        from: 'user_recovery_codes.userId',
        to: 'users.id',
      },
    },
  };

  private generateValidUntil(): string {
    const validUntil = new Date();
    validUntil.setHours(validUntil.getHours() + 2);

    return validUntil.toISOString();
  }

  public async $beforeInsert(): Promise<void> {
    this.uuid = randomUUID();
    this.code = String(Math.floor(Math.random() * 90000) + 10000);
    this.validUntil = this.generateValidUntil();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserRecoveryCodeShape = ModelObject<UserRecoveryCode>;
