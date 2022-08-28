import { UserService } from '@/services/user.service';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  protected userService = new UserService();
}
