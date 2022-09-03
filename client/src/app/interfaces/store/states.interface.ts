import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../models/user.model';

export interface IAuthState {
  err: HttpErrorResponse | null;
  user: IUser | null;
  token: string | null;
  authenticating: boolean;
  sendingVerification: boolean;
}

export interface IAppState {
  auth: IAuthState;
}
