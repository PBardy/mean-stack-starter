import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'x-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [],
})
export class ForgotPasswordComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public constructor(
    private authService: AuthService,
    private readonly store: Store<IAppState>
  ) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService
      .forgotPassword({ email: this.form.value.email! })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }
}
