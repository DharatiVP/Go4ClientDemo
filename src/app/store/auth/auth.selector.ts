import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.types';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const tokenSelector = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);

export const isAuthenticatedSelector = createSelector(
  getAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const tokenExpiryTimeTokenSelector = createSelector(
  getAuthState,
  (state: AuthState) => state.tokenExpiryTime
);
