import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DebugCenterComponent} from './debug/debug-center/debug-center.component';

const routes: Routes = [
  {path: 'debug', component: DebugCenterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
