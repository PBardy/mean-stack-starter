import { CreateUserDto } from '@/dtos/user/create-user.dto';
import { PatchUserDto } from '@/dtos/user/patch-user.dto';
import { RoleEnum } from '@/enums/role.enum';
import { User } from '@/models/user.model';
import { assertIsNotEmpty } from '@/utils/asserts';
import { BaseService } from './base.service';
import { RoleService } from './role.service';

export class UserService extends BaseService {
  private roleService = new RoleService();

  public async getAll(): Promise<Array<User>> {
    return await User.query().select();
  }

  public async getById(id: number): Promise<User> {
    return await User.query().findById(id);
  }

  public async getByUuid(uuid: string): Promise<User> {
    return await User.query().where('uuid', uuid).first();
  }

  public async getByEmail(email: string): Promise<User> {
    return await User.query().where('email', email).withGraphJoined('role').skipUndefined().first();
  }

  public async createOne(dto: CreateUserDto): Promise<User> {
    await assertIsNotEmpty(dto);

    const role = await this.roleService.getByTag(RoleEnum.USER);
    const user = await User.query()
      .insertAndFetch({ ...dto, roleId: role.id })
      .withGraphJoined('role')
      .skipUndefined();

    return user;
  }

  public async patchOne(dto: PatchUserDto): Promise<User> {
    await assertIsNotEmpty(dto);

    const user = await User.query()
      .updateAndFetch({ ...dto })
      .withGraphJoined('role')
      .skipUndefined();

    return user;
  }

  public async deleteOne(uuid: string): Promise<User> {
    const user = await this.getByUuid(uuid);
    await user.$query().delete();

    return user;
  }
}
