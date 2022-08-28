import { CreateUserDto } from '@/dtos/user/create-user.dto';
import { PermissionEnum } from '@/enums/permission.enum';
import { User } from '@/models/user.model';
import { assertHasPermission, assertIsNotEmpty, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  public async getAll(userId: number): Promise<Array<User>> {
    await assertHasPermission(userId, PermissionEnum.VIEW_USERS);

    return await User.query().select();
  }

  public async getById(userId: number, id: number): Promise<User> {
    const user = await User.query().findById(id);
    await assertModelExists(user);

    const permission = userId === user.id ? PermissionEnum.VIEW_SELF : PermissionEnum.VIEW_USER;
    await assertHasPermission(userId, permission);

    return user;
  }

  public async getByUuid(userId: number, uuid: string): Promise<User> {
    const user = await User.query().where('uuid', uuid).first();
    await assertModelExists(user);

    const permission = userId === user.id ? PermissionEnum.VIEW_SELF : PermissionEnum.VIEW_USER;
    await assertHasPermission(userId, permission);

    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    return await User.query().where('email', email).first();
  }

  public async createOne(dto: CreateUserDto): Promise<User> {
    await assertIsNotEmpty(dto);

    const user = await User.query().insertAndFetch(dto);

    return user;
  }

  public async deleteOne(userId: number, uuid: string): Promise<User> {
    const user = await this.getByUuid(userId, uuid);
    const permission = userId === user.id ? PermissionEnum.DELETE_SELF : PermissionEnum.DELETE_USER;
    await assertHasPermission(userId, permission);

    await user.$query().delete();

    return user;
  }
}
