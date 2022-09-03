import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoverAccountComponent } from './pages/recover-account/recover-account.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'recover-account', component: RecoverAccountComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnauthenticatedRoutingModule {}
