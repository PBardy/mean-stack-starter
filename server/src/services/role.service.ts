import { CreateRoleDto } from '@/dtos/role/create-role.dto';
import { PatchRoleDto } from '@/dtos/role/patch-role.dto';
import { UpdateRoleDto } from '@/dtos/role/update-role.dto';
import { Role } from '@/models/role.model';
import { BaseService } from './base.service';

export class RoleService extends BaseService {
  public async getById(userId: number, id: number): Promise<Role> {}
  public async getByUuid(userId: number, uuid: string): Promise<Role> {}
  public async createOne(userId: number, dto: CreateRoleDto): Promise<Role> {}
  public async updateOne(userId: number, dto: UpdateRoleDto): Promise<Role> {}
  public async patchOne(userId: number, dto: PatchRoleDto): Promise<Role> {}
  public async deleteOne(userId: number, uuid: string): Promise<Role> {}
  public async forceDeleteOne(userId: number, uuid: string): Promise<Role> {}
}
