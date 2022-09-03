import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAppState } from '../interfaces/store/states.interface';
import { AuthSelectors } from '../store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public token: string | null = null;

  public constructor(private readonly store: Store<IAppState>) {
    this.store.select(AuthSelectors.selectToken).subscribe((token) => {
      this.token = token;
    });
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.token) {
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token}`,
          },
        })
      );
    }

    return next.handle(req);
  }
}
