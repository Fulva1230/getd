import {Component, OnInit} from '@angular/core';
import {UserEventService} from './user-event.service';
import {LoginService} from './cloudservices/login.service';
import {skip, take} from 'rxjs/operators';
import {PollListService} from './cloudservices/poll-list.service';
import {ToastNotifierService} from './toast-notifier.service';
import {PollBoxDeliveryService} from './data-services/poll-box-delivery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loginHint = '';
  username = '';

  constructor(
    private loginService: LoginService,
    private userEventService: UserEventService,
    private pollListSerivice: PollListService,
    private toastNotifier: ToastNotifierService,
    private pollBoxDeliveryService: PollBoxDeliveryService
  ) {
  }

  ngOnInit(): void {
    this.loginService.accessToken().pipe(skip(1)).subscribe(res => {
      if (res) {
        this.toastNotifier.success('Successfully login');
      } else {
        this.toastNotifier.fail('Failed to login');
      }
    });
    this.userEventService.updateUsernameObs().pipe(take(1)).subscribe(name => this.username = name);
  }

  usernameInput(): void {
    this.userEventService.updateUsername(this.username);
  }

  login(): void {
    this.loginService.login();
  }

  refresh(): void {
    this.userEventService.refresh();
    this.pollListSerivice.refresh().subscribe(pollList => {
      if (pollList) {
        this.toastNotifier.success('Successfully got the poll list');
        for (const questionId of pollList) {
          this.pollBoxDeliveryService
            .request({type: 'poll', questionId})
            .subscribe(res => {
              switch (res.status) {
                case 'FAIL':
                  this.toastNotifier.fail('Failed to get the pollbox');
                  break;
              }
            });
        }
      } else {
        this.toastNotifier.fail('Failed to get the poll list');
      }
    });
  }


}
