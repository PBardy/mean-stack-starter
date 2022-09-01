import { Component, HostListener, isDevMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISignUpForm } from 'src/app/interfaces/forms/sign-up-form.interface';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthActions } from 'src/app/store/actions/auth.actions';

@Component({
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  public readonly form = new FormGroup<ISignUpForm>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    fullName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    repeatPassword: new FormControl<string>('', [Validators.required]),
  });

  public constructor(private readonly store: Store<IAppState>) {}

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (isDevMode()) {
      const key = event.key.toUpperCase();
      switch (key) {
        case '1':
          return this.signUpAsUser();
        case '2':
          return this.signUpAsAdmin();
      }
    }
  }

  private signIn() {
    const details = {
      email: this.form.value.email!,
      fullName: this.form.value.fullName!,
      password: this.form.value.password!,
    };

    this.store.dispatch(AuthActions.signUp(details));
  }

  private signUpAsUser() {
    this.form.patchValue({
      email: 'user@gmail.com',
      fullName: 'Normal User',
      password: 'password',
    });

    this.signIn();
  }

  private signUpAsAdmin() {
    this.form.patchValue({
      email: 'admin@gmail.com',
      fullName: 'Admin User',
      password: 'password',
    });

    this.signIn();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.signIn();
  }
}
