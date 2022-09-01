import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
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

  public constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
