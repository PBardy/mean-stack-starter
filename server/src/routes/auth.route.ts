import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthController } from '@/controllers/auth.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignOutRequestDto } from '@/dtos/auth/SignOutRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { RecoverAccountRequestDto } from '@/dtos/auth/RecoverAccountRequest.dto';
import { ResetPasswordRequestDto } from '@/dtos/auth/ResetPasswordRequest.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import { EmailConfirmationEmailDto } from '@/dtos/emails/EmailConfirmationEmail.dto';
import { VerifyEmailRequestDto } from '@/dtos/auth/VerifyEmailRequest.dto';

export class AuthRoute implements Routes {
  public path = '/api/auth';
  public router = Router();
  public controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/sign-in`, validationMiddleware(SignInRequestDto, 'body'), this.controller.signIn);
    this.router.post(`${this.path}/sign-up`, validationMiddleware(SignUpRequestDto, 'body'), this.controller.signUp);
    this.router.post(`${this.path}/sign-out`, validationMiddleware(SignOutRequestDto, 'body'), this.controller.signOut);
    this.router.post(
      `${this.path}/reset-password`,
      authMiddleware,
      validationMiddleware(ResetPasswordRequestDto, 'body'),
      this.controller.resetPassword,
    );
    this.router.post(`${this.path}/verify-email`, authMiddleware, validationMiddleware(VerifyEmailRequestDto, 'body'), this.controller.verifyEmail);
    this.router.post(`${this.path}/recover-account`, validationMiddleware(RecoverAccountRequestDto, 'body'), this.controller.recoverAccount);
    this.router.post(`${this.path}/forgot-password`, validationMiddleware(ForgotPasswordRequestDto, 'body'), this.controller.forgotPassword);
  }
}
