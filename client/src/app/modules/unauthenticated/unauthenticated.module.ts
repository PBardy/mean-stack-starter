import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    UnauthenticatedRoutingModule
  ]
})
export class UnauthenticatedModule { }
