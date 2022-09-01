import { PermissionGroupEnum } from '@/enums/permission-group.enum';
import { PermissionEnum } from '@/enums/permission.enum';
import { RoleEnum } from '@/enums/role.enum';

export interface IProperty {
  label: string;
  description: string;
  protected: boolean;
}

export interface IRole extends IProperty {
  tag: RoleEnum;
}

export interface IPermission extends IProperty {
  tag: PermissionEnum;
}

export interface IPermissionGroup extends IProperty {
  tag: PermissionGroupEnum;
}
