import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { PerimissionController } from '@/controllers/permission.controller';

export class PermissionsRoute implements Routes {
  public path = '/permissions';
  public router = Router();
  public controller = new PerimissionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    return;
  }
}
