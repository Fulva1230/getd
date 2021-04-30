import { Component, OnInit } from '@angular/core';
import {UserManager} from 'oidc-client';

@Component({
  selector: 'app-silent-login-callback',
  templateUrl: './silent-login-callback.component.html',
  styleUrls: ['./silent-login-callback.component.scss']
})
export class SilentLoginCallbackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const mgr = new UserManager({});
    mgr.signinSilentCallback().then(() => {
      window.history.replaceState({},
        window.document.title,
        window.location.origin);
      window.close();
    }, error => {
      console.error(error);
    });
  }

}
