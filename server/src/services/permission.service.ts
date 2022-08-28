import { CreatePermissionDto } from '@/dtos/permission/create-permission.dto';
import { PatchPermissionDto } from '@/dtos/permission/patch-permission.dto';
import { UpdatePermissionDto } from '@/dtos/permission/update-permission.dto';
import { PermissionEnum } from '@/enums/permission.enum';
import { Permission } from '@/models/permission.model';
import { assertHasPermission, assertModelExists } from '@/utils/asserts';
import { BaseService } from './base.service';

export class PermissionService extends BaseService {
  public async getAll(userId: number): Promise<Permission[]> {
    await assertHasPermission(userId, PermissionEnum.VIEW_PERMISSIONS);

    const permissions = await Permission.query().select();

    return permissions;
  }

  public async getById(userId: number, id: number): Promise<Permission> {
    await assertHasPermission(userId, PermissionEnum.VIEW_PERMISSIONS);

    const permission = await Permission.query().findById(id);
    await assertModelExists(permission);

    return permission;
  }

  public async getByUuid(userId: number, uuid: string): Promise<Permission> {
    await assertHasPermission(userId, PermissionEnum.VIEW_PERMISSIONS);

    const permission = await Permission.query().where('uuid', uuid).first();
    await assertModelExists(permission);

    return permission;
  }

  public async createOne(userId: number, dto: CreatePermissionDto): Promise<Permission> {
    return;
  }

  public async updateOne(userId: number, dto: UpdatePermissionDto): Promise<Permission> {
    return;
  }

  public async patchOne(userId: number, dto: PatchPermissionDto): Promise<Permission> {
    return;
  }

  public async deleteOne(userId: number, uuid: string): Promise<Permission> {
    return;
  }

  public async forceDeleteOne(userId: number, uuid: string): Promise<Permission> {
    return;
  }
}
