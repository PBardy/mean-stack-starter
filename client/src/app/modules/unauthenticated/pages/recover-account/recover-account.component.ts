import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { AuthSelectors } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'x-recover-account',
  templateUrl: './recover-account.component.html',
  styles: [],
})
export class RecoverAccountComponent implements OnInit {
  public authState$ = this.store.select(AuthSelectors.selectSelf);

  public readonly form = new FormGroup({
    code: new FormControl<string>('', [Validators.required]),
  });

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<IAppState>
  ) {}

  ngOnInit(): void {}

  public get email(): string {
    return this.route.snapshot.queryParams['email'];
  }

  public resendVerification(): void {
    this.store.dispatch(AuthActions.resendVerification({ email: this.email }));
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.email,
      code: this.form.value.code!,
    };

    this.store.dispatch(AuthActions.recoverAccount(payload));
  }
}
