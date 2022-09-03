import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../../interfaces/store/states.interface';
import { AuthActions } from '../actions/auth.actions';

export const initialAuthState: IAuthState = {
  err: null,
  user: null,
  token: null,
  authenticating: false,
  sendingVerification: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.signIn, (state) => {
    return { ...state, authenticating: true, err: null };
  }),
  on(AuthActions.signUp, (state) => {
    return { ...state, authenticating: true, err: null };
  }),
  on(AuthActions.signOut, (state) => {
    return { ...state, authenticating: true, err: null };
  }),
  on(AuthActions.signInSuccess, (state, { user, token }) => {
    return { ...state, user, token, authenticating: false };
  }),
  on(AuthActions.signUpSuccess, (state, { user, token }) => {
    return { ...state, user, token, authenticating: false };
  }),
  on(AuthActions.signInFailure, (state, { err }) => {
    return { ...state, err, authenticating: false };
  }),
  on(AuthActions.signUpFailure, (state, { err }) => {
    return { ...state, err, authenticating: false };
  }),
  on(AuthActions.signOutFailure, (state, { err }) => {
    return { ...state, err, authenticating: false };
  }),
  on(AuthActions.forgotPassword, (state) => {
    return { ...state, sendingVerification: true };
  }),
  on(AuthActions.resendVerification, (state) => {
    return { ...state, sendingVerification: true };
  }),
  on(AuthActions.forgotPasswordSuccess, (state) => {
    return { ...state, sendingVerification: false };
  }),
  on(AuthActions.resendVerificationSuccess, (state) => {
    return { ...state, sendingVerification: false };
  }),
  on(AuthActions.recoverAccount, (state) => {
    return { ...state, authenticating: true };
  }),
  on(AuthActions.recoverAccountSuccess, (state, action) => {
    return { ...state, token: action.token, authenticating: false };
  }),
  on(AuthActions.recoverAccountFailure, (state, action) => {
    return { ...state, error: action.error, authenticating: false };
  }),
  on(AuthActions.confirmEmail, (state, action) => {
    return { ...state, token: action.token, authenticating: true };
  }),
  on(AuthActions.confirmEmailFailure, (state, action) => {
    return { ...state, error: action.error, authenticating: false };
  }),
  on(AuthActions.confirmEmailSuccess, (state, { user, token }) => {
    return { ...state, user, token, authenticating: false };
  })
);
