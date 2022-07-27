import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const login = createAction(
  '[AUTH] Login Action',
  props<{ username: string; token: string; tokenExpiryTime: Moment }>()
);

export const logout = createAction('[AUTH] Logout Action');
