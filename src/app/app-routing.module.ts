import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DebugCenterComponent} from './debug/debug-center/debug-center.component';
import {PollListComponent} from './poll-list/poll-list.component';

const routes: Routes = [
  {path: 'debug', component: DebugCenterComponent},
  {path: '', component: PollListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
