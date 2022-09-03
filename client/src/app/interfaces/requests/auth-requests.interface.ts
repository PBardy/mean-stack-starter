export namespace AuthRequests {
  export interface ISignIn {
    email: string;
    password: string;
  }

  export interface ISignUp {
    email: string;
    password: string;
    fullName: string;
  }

  export interface ISignOut {
    reason: string;
  }

  export interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
  }

  export interface IResetPassword {
    newPassword: string;
  }

  export interface IRefreshSession {}

  export interface IForgotPassword {
    email: string;
  }

  export interface IRecoverAccount {
    code: string;
    email: string;
  }
}
