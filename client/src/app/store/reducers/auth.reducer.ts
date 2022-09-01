import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../../interfaces/store/states.interface';
import { AuthActions } from '../actions/auth.actions';

export const initialAuthState: IAuthState = {
  err: null,
  user: null,
  token: null,
  authenticating: false,
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
    return {
      ...state,
      user,
      token,
      authenticating: false,
    };
  }),
  on(AuthActions.signUpSuccess, (state, { user, token }) => {
    return {
      ...state,
      user,
      token,
      authenticating: false,
    };
  }),
  on(AuthActions.signInFailure, (state, { err }) => {
    return { ...state, err, authenticating: false };
  }),
  on(AuthActions.signUpFailure, (state, { err }) => {
    return { ...state, err, authenticating: false };
  }),
  on(AuthActions.signOutFailure, (state, { err }) => {
    return { ...state, err, authenticating: false };
  })
);
