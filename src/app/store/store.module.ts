import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './auth/auth.reducer';
import { AUTH_FEATURE_KEY } from './auth/auth.types';

@NgModule({
  imports: [StoreModule.forFeature(AUTH_FEATURE_KEY, AuthReducer)],
})
export class AppStoreModule {}
