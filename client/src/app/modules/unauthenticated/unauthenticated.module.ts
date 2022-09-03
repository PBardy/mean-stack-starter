import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoverAccountComponent } from './pages/recover-account/recover-account.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, RecoverAccountComponent, ResetPasswordComponent, ConfirmEmailComponent],
  imports: [CommonModule, SharedModule, UnauthenticatedRoutingModule],
})
export class UnauthenticatedModule {}
