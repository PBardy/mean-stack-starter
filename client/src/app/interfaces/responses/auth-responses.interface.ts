import { IUser } from '../models/user.model';

export namespace AuthResponses {
  export interface ISignIn {
    user: IUser;
    token: string;
  }

  export interface ISignUp {
    user: IUser;
    token: string;
  }

  export interface ISignOut {
    success: boolean;
  }

  export interface IUpdatePassword {}

  export interface IResetPassword {}

  export interface IRefreshSession {}

  export interface IRecoverAccount {
    token: string;
  }
}
