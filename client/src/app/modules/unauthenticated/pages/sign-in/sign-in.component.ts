import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignInForm } from 'src/app/interfaces/forms/sign-in-form.interface';

@Component({
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public readonly form = new FormGroup<ISignInForm>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public constructor() {}

  public get shouldShowEmailRequired(): boolean {
    return false;
  }

  public get shouldShowEmailInvalid(): boolean {
    return false;
  }

  public get shouldShowPasswordRequired(): boolean {
    return false;
  }
}
