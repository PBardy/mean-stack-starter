import { Component, HostListener, isDevMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISignInForm } from 'src/app/interfaces/forms/sign-in-form.interface';
import { AuthRequests } from 'src/app/interfaces/requests/auth-requests.interface';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthActions } from 'src/app/store/actions/auth.actions';

@Component({
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public readonly form = new FormGroup<ISignInForm>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    remember: new FormControl<boolean>(false),
  });

  public constructor(private readonly store: Store<IAppState>) {}

  public get shouldShowEmailRequired(): boolean {
    return false;
  }

  public get shouldShowEmailInvalid(): boolean {
    return false;
  }

  public get shouldShowPasswordRequired(): boolean {
    return false;
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (isDevMode()) {
      const key = event.key.toUpperCase();
      switch (key) {
        case '1':
          return this.signInAsUser();
        case '2':
          return this.signInAsAdmin();
      }
    }
  }

  private signIn() {
    const details = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.store.dispatch(AuthActions.signIn(details));
  }

  private signInAsUser() {
    this.form.patchValue({
      email: 'user@gmail.com',
      password: 'password',
    });

    this.signIn();
  }

  private signInAsAdmin() {
    this.form.patchValue({
      email: 'admin@gmail.com',
      password: 'password',
    });

    this.signIn();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.controls.remember.value!) {
      // @todo: remember to keep user signed in
    }

    this.signIn();
  }
}
