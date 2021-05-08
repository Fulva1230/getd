import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DebugCenterComponent} from './debug/debug-center/debug-center.component';
import {PollListComponent} from './vote-page/poll-list/poll-list.component';
import {LoginCallbackComponent} from './login/login-callback/login-callback.component';
import {SilentLoginCallbackComponent} from './login/silent-login-callback/silent-login-callback.component';
import {DebugTableComponent} from './debug/debug-table/debug-table.component';
import {DebugDeterminesChartComponent} from './debug/debug-determines-chart/debug-determines-chart.component';
import {ReportMainComponent} from './report/report-main/report-main.component';

const routes: Routes = [
  {path: 'debug', component: DebugCenterComponent},
  {path: 'debug-table', component: DebugTableComponent},
  {path: 'debug-determines-chart', component: DebugDeterminesChartComponent},
  {path: '', component: PollListComponent},
  {path: 'login-callback', component: LoginCallbackComponent},
  {path: 'silent-login-callback', component: SilentLoginCallbackComponent},
  {path: 'report', component: ReportMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
