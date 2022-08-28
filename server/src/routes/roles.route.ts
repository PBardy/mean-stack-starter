import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { RoleController } from '@/controllers/role.controller';

export class RolesRoute implements Routes {
  public path = '/permissions';
  public router = Router();
  public controller = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    return;
  }
}
