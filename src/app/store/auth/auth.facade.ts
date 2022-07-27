import { createFeatureSelector, select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AuthSelector from './auth.selector';

import { AUTH_FEATURE_KEY, AuthState } from './auth.types';
import * as AuthAction from './auth.action';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  authFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

  constructor(private store: Store<AuthState>) {}

  tokenSelector$ = this.store.pipe(select(AuthSelector.tokenSelector));

  isAuthenticatedSelector$ = this.store.pipe(
    select(AuthSelector.isAuthenticatedSelector)
  );

  tokenExpiryTimeTokenSelector$ = this.store.pipe(
    select(AuthSelector.tokenExpiryTimeTokenSelector)
  );

  login = (username: string, token: string, tokenExpiryTime: Moment) => {
    this.store.dispatch(AuthAction.login({ username, token, tokenExpiryTime }));
  };

  logout = () => {
    this.store.dispatch(AuthAction.logout());
  };
}
