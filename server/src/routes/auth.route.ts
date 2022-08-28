import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthController } from '@/controllers/auth.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignOutRequestDto } from '@/dtos/auth/SignOutRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/sign-in`, validationMiddleware(SignInRequestDto, 'body'), this.controller.signIn);
    this.router.post(`${this.path}/sign-up`, validationMiddleware(SignUpRequestDto, 'body'), this.controller.signUp);
    this.router.post(`${this.path}/sign-out`, validationMiddleware(SignOutRequestDto, 'body'), this.controller.signOut);
  }
}
