import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignInResponseDto } from '@/dtos/auth/SignInResponse.dto';
import { SignOutRequestDto } from '@/dtos/auth/SignOutRequest.dto';
import { SignOutResponseDto } from '@/dtos/auth/SignOutResponse.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { SignUpResponseDto } from '@/dtos/auth/SignUpResponse.dto';
import { AuthService } from '@/services/auth.service';
import { PasswordService } from '@/services/password.service';
import { logger } from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {
  protected authService = new AuthService();
  protected passwordService = new PasswordService();

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await this.authService.signIn(req.body as SignInRequestDto);
      logger.debug(JSON.stringify(user));
      res.status(200).json({
        data: new SignInResponseDto(user, token),
      });
    } catch (err) {
      next(err);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await this.authService.signUp(req.body as SignUpRequestDto);
      res.status(200).json({
        data: new SignUpResponseDto(user, token),
      });
    } catch (err) {
      next(err);
    }
  };

  public signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const success = await this.authService.signOut(req.body as SignOutRequestDto);
      res.status(200).json({
        data: new SignOutResponseDto(success),
      });
    } catch (err) {
      next(err);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.passwordService.forgotPassword(req.body as ForgotPasswordRequestDto);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
