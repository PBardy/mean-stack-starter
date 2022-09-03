import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/store/states.interface';

export namespace AuthSelectors {
  export const selectSelf = (state: IAppState) => state.auth;

  export const selectError = createSelector(selectSelf, (state) => state.err);

  export const selectUser = createSelector(selectSelf, (state) => state.user);

  export const selectToken = createSelector(selectSelf, (state) => state.token);

  export const selectAuthenticating = createSelector(
    selectSelf,
    (state) => state.authenticating
  );

  export const selectSendingVerification = createSelector(
    selectSelf,
    (state) => state.sendingVerification
  );
}
