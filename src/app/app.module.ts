import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PollboxComponent} from './pollbox/pollbox.component';
import {PollListComponent} from './poll-list/poll-list.component';
import {LoginDebugComponent} from './debug/login-debug/login-debug.component';
import {HttpClientModule} from '@angular/common/http';
import { DebugCenterComponent } from './debug/debug-center/debug-center.component';

@NgModule({
  declarations: [
    AppComponent,
    PollboxComponent,
    PollListComponent,
    LoginDebugComponent,
    DebugCenterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
