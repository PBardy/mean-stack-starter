import { Component, HostListener, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { AuthSelectors } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'x-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [],
})
export class ForgotPasswordComponent implements OnInit {
  public sendingVerification$ = this.store.select(
    AuthSelectors.selectSendingVerification
  );

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public constructor(private readonly store: Store<IAppState>) {}

  public ngOnInit(): void {}

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (isDevMode()) {
      const key = event.key.toLowerCase();
      switch (key) {
        case '`':
          this.runTestCase();
      }
    }
  }

  private runTestCase(): void {
    this.form.patchValue({ email: 'test@gmail.com' });
    this.onSubmit();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.form.value.email!,
    };

    this.store.dispatch(AuthActions.forgotPassword(payload));
  }
}
