import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DebugCenterComponent} from './debug/debug-center/debug-center.component';
import {PollListComponent} from './poll-list/poll-list.component';
import {LoginCallbackComponent} from './login/login-callback/login-callback.component';
import {SilentLoginCallbackComponent} from './login/silent-login-callback/silent-login-callback.component';

const routes: Routes = [
  {path: 'debug', component: DebugCenterComponent},
  {path: '', component: PollListComponent},
  {path: 'login-callback', component: LoginCallbackComponent},
  {path: 'silent-login-callback', component: SilentLoginCallbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
