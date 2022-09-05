import { CreatePermissionDto } from '@/dtos/permission/create-permission.dto';
import { PatchPermissionDto } from '@/dtos/permission/patch-permission.dto';
import { UpdatePermissionDto } from '@/dtos/permission/update-permission.dto';
import { Permission } from '@/models/permission.model';
import { BaseService } from './base.service';

export class PermissionService extends BaseService {
  public async getAll(): Promise<Permission[]> {
    return await Permission.query().select();
  }

  public async getById(id: number): Promise<Permission> {
    return await Permission.query().findById(id);
  }

  public async getByUuid(uuid: string): Promise<Permission> {
    return await Permission.query().where('uuid', uuid).first();
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
