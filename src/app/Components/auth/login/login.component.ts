import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/AuthServices/auth.service';
import { AuthFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  subscriptions: Subscription[] = [];

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribe();
  }

  subscribe() {
    const tokenSubscription = this.authFacade.tokenSelector$.subscribe(
      (token:any) => {
        console.log(token);
      }
    );

    const authenticatedSubscription =
      this.authFacade.isAuthenticatedSelector$.subscribe((authenticated:any) => {
        if (authenticated) {
          this.router.navigate(['home']);
        }
      });
    this.subscriptions = [tokenSubscription, authenticatedSubscription];
  }

  onLogin() {
    this.authService.login(this.username, moment().add(10, 'minutes'));
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.map((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
