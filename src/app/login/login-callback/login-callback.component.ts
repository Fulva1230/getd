import {Component, OnInit} from '@angular/core';
import {UserManager} from 'oidc-client';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const mgr = new UserManager({});
    mgr.signinPopupCallback().then(() => {
      window.history.replaceState({},
        window.document.title,
        window.location.origin);
      window.close();
    }, error => {
      console.error(error);
    });
  }

}
