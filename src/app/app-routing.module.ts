import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginDebugComponent} from './debug/login-debug/login-debug.component';

const routes: Routes = [
  {path: 'debug', component: LoginDebugComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
