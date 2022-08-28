import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { PermissionGroupController } from '@/controllers/permission-group.controller';

export class PermissionGroupsRoute implements Routes {
  public path = '/permissions/groups';
  public router = Router();
  public controller = new PermissionGroupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    return;
  }
}
