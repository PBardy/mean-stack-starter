import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@/controllers/user.controller';

export class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    return;
  }
}
