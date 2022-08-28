import { PermissionService } from '@/services/permission.service';
import { BaseController } from './base.controller';

export class PerimissionController extends BaseController {
  protected permissionService = new PermissionService();
}
