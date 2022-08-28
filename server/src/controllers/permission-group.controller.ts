import { PermissionGroupService } from '@/services/permission-group.service';
import { BaseController } from './base.controller';

export class PermissionGroupController extends BaseController {
  protected permissionGroupService = new PermissionGroupService();
}
