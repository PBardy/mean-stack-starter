import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequests } from '../interfaces/requests/auth-requests.interface';
import { IApiResponse } from '../interfaces/responses/api-responses.interface';
import { AuthResponses } from '../interfaces/responses/auth-responses.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  public constructor(protected override http: HttpClient) {
    super(http);
  }

  public signIn(payload: AuthRequests.ISignIn) {
    return this.http.post<IApiResponse<AuthResponses.ISignIn>>('/api/auth/sign-in', payload);
  }

  public signUp(payload: AuthRequests.ISignUp) {
    return this.http.post<IApiResponse<AuthResponses.ISignUp>>('/api/auth/sign-up', payload);
  }

  public signOut(payload: AuthRequests.ISignOut) {
    return this.http.post<IApiResponse<AuthResponses.ISignOut>>('/api/auth/sign-out', payload);
  }

  public forgotPassword(payload: AuthRequests.IForgotPassword) {
    return this.http.post('/api/auth/forgot-password', payload);
  }

  public updatePassword(payload: AuthRequests.IUpdatePassword) {
    return this.http.post('/api/auth/update-password', payload);
  }

  public resetPassword(payload: AuthRequests.IResetPassword) {
    return this.http.post('/api/auth/reset-password', payload);
  }

  public refreshSession(payload: AuthRequests.IRefreshSession) {
    return this.http.post('/api/auth/refresh-session', payload);
  }
}
