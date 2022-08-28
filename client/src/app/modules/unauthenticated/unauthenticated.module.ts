import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, SharedModule, UnauthenticatedRoutingModule],
})
export class UnauthenticatedModule {}
