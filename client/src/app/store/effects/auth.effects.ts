import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, tap, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  public readonly signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ type, ...payload }) =>
        this.authService.signIn(payload).pipe(
          map((res) => AuthActions.signInSuccess(res.data)),
          catchError((err) => {
            console.log(err);
            return EMPTY;
          })
        )
      )
    )
  );

  public readonly signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ type, ...payload }) =>
        this.authService.signUp(payload).pipe(
          map((res) => AuthActions.signUpSuccess(res.data)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public readonly forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      mergeMap(({ type, ...payload }) =>
        this.authService.forgotPassword(payload).pipe(
          tap(() => {
            this.router.navigate(['/recover-account'], {
              queryParams: { email: payload.email },
            });
          }),
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public readonly resendVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendVerification),
      mergeMap(({ type, ...payload }) =>
        this.authService.forgotPassword(payload).pipe(
          map(() => AuthActions.resendVerificationSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public readonly recoverAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.recoverAccount),
      mergeMap(({ type, ...payload }) =>
        this.authService.recoverAccount(payload).pipe(
          tap(() => {
            this.router.navigate(['/reset-password']);
          }),
          map((res) => AuthActions.recoverAccountSuccess(res.data)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
}
