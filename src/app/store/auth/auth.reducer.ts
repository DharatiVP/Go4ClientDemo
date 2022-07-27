import { Action, createReducer, on, StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.types';
import * as AuthAction from './auth.action';

export const initialState: AuthState = {
  userName: '',
  token: '',
  tokenExpiryTime: null,
  isAuthenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthAction.login, (state: AuthState, action) => ({
    ...state,
    userName: action.username,
    token: action.token,
    tokenExpiryTime: action.tokenExpiryTime,
    isAuthenticated: true,
  })),
  on(AuthAction.logout, () => initialState)
);

export const AuthReducer = (state: AuthState, action: Action) => {
  return reducer(state, action);
};
