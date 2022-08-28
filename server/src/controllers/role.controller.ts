import { RoleService } from '@/services/role.service';
import { BaseController } from './base.controller';

export class RoleController extends BaseController {
  protected roleService = new RoleService();
}
