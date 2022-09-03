import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/store/states.interface';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { AuthSelectors } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'x-confirm-email',
  templateUrl: './confirm-email.component.html',
  styles: [],
})
export class ConfirmEmailComponent implements OnInit {
  public authState$ = this.store.select(AuthSelectors.selectSelf);

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<IAppState>
  ) {}

  public ngOnInit(): void {}

  public get email(): string {
    return this.route.snapshot.queryParams['email'];
  }

  public get token(): string {
    return this.route.snapshot.queryParams['token'];
  }

  public onSubmit(): void {
    const payload = {
      email: this.email,
      token: this.token,
    };

    this.store.dispatch(AuthActions.confirmEmail(payload));
  }
}
