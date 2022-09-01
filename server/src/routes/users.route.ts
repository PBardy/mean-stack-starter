import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@/controllers/user.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateUserDto } from '@/dtos/user/create-user.dto';
import authMiddleware from '@/middlewares/auth.middleware';

export class UsersRoute implements Routes {
  public path = '/api/users';
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authMiddleware, this.controller.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.controller.getOne);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.controller.createOne);
    this.router.delete(`${this.path}/:uuid`, authMiddleware, this.controller.deleteOne);
  }
}
