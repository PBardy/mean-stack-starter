import { BaseService } from './base.service';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';

export class RolePermissionService extends BaseService {
  protected roleService = new RoleService();
  protected permissionService = new PermissionService();

  public async add(userId: number, roleId: string, permissionId: string) {
    const role = await this.roleService.getByUuid(userId, roleId);
    const permission = await this.permissionService.getByUuid(userId, permissionId);
  }

  public async remove(userId: number, roleId: string, permissionId: string) {
    const role = await this.roleService.getByUuid(userId, roleId);
    const permission = await this.permissionService.getByUuid(userId, permissionId);
  }
}
