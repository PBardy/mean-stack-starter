import { IModel, ITimeStamps } from '@/interfaces/model.interface';
import { IBaseUserVerification } from '@/interfaces/user-verification.interface';
import { randomUUID } from 'crypto';
import { Model, ModelObject } from 'objection';

export class UserVerfication extends Model implements IModel, ITimeStamps, IBaseUserVerification {
  public id: number;
  public uuid: string;
  public email: string;
  public token: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public static idColumn = 'id';
  public static tableName = 'user_verifications';

  public async $beforeInsert(): Promise<void> {
    this.token = randomUUID();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserVerficationShape = ModelObject<UserVerfication>;
