import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../cloudservices/login.service';

@Component({
  selector: 'app-login-debug',
  templateUrl: './login-debug.component.html',
  styleUrls: ['./login-debug.component.css']
})
export class LoginDebugComponent implements OnInit {
  accessToken?: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.accessToken().subscribe(accessToken => {
      this.accessToken = accessToken;
    });
  }

  signin(): void {
    this.loginService.login();
  }

  silentSignin(): void {
    this.loginService.silentLogin();
  }
}
