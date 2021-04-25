import {Component} from '@angular/core';
import {UserEventService} from './user-event.service';
import {LoginService} from './cloudservices/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loginHint = '';

  constructor(
    private loginService: LoginService,
    private userEventService: UserEventService
  ) {
    this.loginService.accessToken().subscribe(res => {
      if (res) {
        this.loginHint = 'SUCCESS LOGIN';
      } else {
        this.loginHint = '';
      }
    });
  }

  login(): void {
    this.loginService.login();
  }

  refreshPollList(): void {
    this.userEventService.refreshPollList();
  }
}
