import { Injectable } from '@angular/core';
import { AuthFacade } from 'src/app/store/auth/auth.facade';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authFacade: AuthFacade) {}

  isAuthenticated(): boolean {
    let isUserAuthenticated = false;
    this.authFacade.isAuthenticatedSelector$.subscribe(
      (isAuthenticated:any) => (isUserAuthenticated = isAuthenticated)
    );
    if (!isUserAuthenticated && !this.isSessionExpired(this.sessionTime)) {
      const username = localStorage.getItem('username') || '';
      const token = localStorage.getItem('token') || '';
      const date = localStorage.getItem('tokenExpiryTime') || '';
      if (username && token && date) {
        this.login(username, this.sessionTime, token);
      }
      this.authFacade.isAuthenticatedSelector$.subscribe(
        (isAuthenticated:any) => (isUserAuthenticated = isAuthenticated)
      );
    }
    if (!isUserAuthenticated) {
      this.logout();
    }
    return isUserAuthenticated;
  }

  login(username: string, time: moment.Moment, token?: string) {
    this.authFacade.login(username, `Token for ${username}`, time);
    localStorage.setItem('username', username);
    // TODO: Here OR ( || ) operater for just now
    localStorage.setItem('token', token || `Token for ${username}`);
    localStorage.setItem('tokenExpiryTime', JSON.stringify(time));
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiryTime');
    this.authFacade.logout();
  }

  isSessionExpired(time: moment.Moment) {
    console.log('Session will expire at ', time.format('HH:mm:ss'));
    if (time.diff(moment()) < 0) {
      return true;
    }
    return false;
  }

  get sessionTime() {
    let time = localStorage.getItem('tokenExpiryTime');
    time = time ? JSON.parse(time) : '';
    return moment(time);
  }
}
