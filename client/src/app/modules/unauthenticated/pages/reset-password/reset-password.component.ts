import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { AuthSelectors } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'x-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [],
})
export class ResetPasswordComponent implements OnInit {
  public authState$ = this.store.select(AuthSelectors.selectSelf);

  public readonly form = new FormGroup({
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  });

  public constructor(private readonly store: Store<IAppState>) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      newPassword: this.form.value.password!,
    };

    this.store.dispatch(AuthActions.resetPassword(payload));
  }
}
