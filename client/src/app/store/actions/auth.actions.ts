import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthResponses } from 'src/app/interfaces/responses/auth-responses.interface';
import { AuthRequests } from '../../interfaces/requests/auth-requests.interface';

export namespace AuthActions {
  export const signIn = createAction(
    'auth/sign-in',
    props<AuthRequests.ISignIn>()
  );

  export const signInSuccess = createAction(
    'auth/sign-in/success',
    props<AuthResponses.ISignIn>()
  );

  export const signInFailure = createAction(
    'auth/sign-in/failure',
    props<{ err: HttpErrorResponse }>()
  );

  export const signUp = createAction(
    'auth/sign-up',
    props<AuthRequests.ISignUp>()
  );

  export const signUpSuccess = createAction(
    'auth/sign-up/success',
    props<AuthResponses.ISignUp>()
  );

  export const signUpFailure = createAction(
    'auth/sign-up/failure',
    props<{ err: HttpErrorResponse }>()
  );

  export const signOut = createAction(
    'auth/sign-out',
    props<AuthRequests.ISignOut>()
  );

  export const signOutSuccess = createAction(
    'auth/sign-out/success',
    props<AuthResponses.ISignOut>()
  );

  export const signOutFailure = createAction(
    'auth/sign-out/failure',
    props<{ err: HttpErrorResponse }>()
  );

  export const updatePassword = createAction(
    'auth/update-password',
    props<AuthRequests.IUpdatePassword>()
  );

  export const resetPassword = createAction(
    'auth/reset-password',
    props<AuthRequests.IResetPassword>()
  );

  export const refreshSession = createAction('auth/refresh-session');

  export const forgotPassword = createAction(
    'auth/forgot-password',
    props<AuthRequests.IForgotPassword>()
  );
}
