import { PermissionGroup } from '@/models/permission-group.model';
import { assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';

export class PermissionGroupService extends BaseService {
  public async getByUuid(uuid: string): Promise<PermissionGroup> {
    return await PermissionGroup.query().where('uuid', uuid).first();
  }

  public async getOne(uuid: string): Promise<PermissionGroup> {
    const model = await this.getByUuid(uuid);
    await assertModelExists(model);

    return model;
  }

  public async getAll(): Promise<PermissionGroup[]> {
    return await PermissionGroup.query().select();
  }
}
