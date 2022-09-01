import { RoleEnum } from '@/enums/role.enum';
import { Role } from '@/models/role.model';
import { BaseService } from './base.service';

export class RoleService extends BaseService {
  public async getById(id: number): Promise<Role> {
    return await Role.query().findById(id).withGraphJoined('permissions');
  }

  public async getByUuid(uuid: string): Promise<Role> {
    return await Role.query().where('uuid', uuid).withGraphJoined('permissions').first();
  }

  public async getByTag(tag: RoleEnum): Promise<Role> {
    return await Role.query().where('roles.tag', tag).withGraphJoined('permissions').first();
  }
}
