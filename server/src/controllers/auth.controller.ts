import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { RecoverAccountRequestDto } from '@/dtos/auth/RecoverAccountRequest.dto';
import { RecoverAccountResponseDto } from '@/dtos/auth/RecoverAccountResponse.dto';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignInResponseDto } from '@/dtos/auth/SignInResponse.dto';
import { SignOutRequestDto } from '@/dtos/auth/SignOutRequest.dto';
import { SignOutResponseDto } from '@/dtos/auth/SignOutResponse.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { SignUpResponseDto } from '@/dtos/auth/SignUpResponse.dto';
import { VerifyEmailRequestDto } from '@/dtos/auth/VerifyEmailRequest.dto';
import { VerifyEmailResponseDto } from '@/dtos/auth/VerifyEmailResponse.dto';
import { EmailConfirmationEmailDto } from '@/dtos/emails/EmailConfirmationEmail.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { AuthService } from '@/services/auth.service';
import { EmailService } from '@/services/email.service';
import { PasswordService } from '@/services/password.service';
import { VerificationService } from '@/services/verification.service';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {
  protected authService = new AuthService();
  protected emailService = new EmailService();
  protected passwordService = new PasswordService();
  protected verificationService = new VerificationService();

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await this.authService.signIn(req.body as SignInRequestDto);
      res.status(200).json({
        data: new SignInResponseDto(user, token.token),
      });
    } catch (err) {
      next(err);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await this.authService.signUp(req.body as SignUpRequestDto);
      const emailDto = new EmailConfirmationEmailDto({
        user,
        token,
      });

      this.emailService.setEmailConfirmationEmail(emailDto);

      res.status(200).json({
        data: new SignUpResponseDto(user, token.token),
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

  public forgotPassword = async (req: Request, res: Response) => {
    try {
      await this.passwordService.forgotPassword(req.body as ForgotPasswordRequestDto);
    } catch (err) {
      // maybe log potential errors, but never show to client
    } finally {
      res.status(204).send();
    }
  };

  public verifyEmail = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const success = await this.verificationService.verifyEmail(req.body as VerifyEmailRequestDto);
      res.status(200).json({
        data: VerifyEmailResponseDto.fromJson({ success }),
      });
    } catch (err) {
      next(err);
    }
  };

  public recoverAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.passwordService.recoverAccount(req.body as RecoverAccountRequestDto);
      const { token } = this.authService.createToken(user);
      res.status(200).json({
        data: RecoverAccountResponseDto.fromJson({ token }),
      });
    } catch (err) {
      next(err);
    }
  };
}
