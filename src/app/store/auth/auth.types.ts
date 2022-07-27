import { Moment } from 'moment';

export interface AuthState {
  userName: string;
  token: string;
  tokenExpiryTime: Moment | null;
  isAuthenticated: boolean;
}

export const AUTH_FEATURE_KEY = 'authFeatureKey';
