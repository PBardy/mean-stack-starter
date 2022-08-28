import { PermissionsShape } from '@/models/permission.model';

export interface IHasPermissions {
  permissions: PermissionsShape[];
}
