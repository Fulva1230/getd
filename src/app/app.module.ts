import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PollboxComponent} from './pollbox/pollbox.component';
import {PollListComponent} from './poll-list/poll-list.component';
import {LoginDebugComponent} from './debug/login-debug/login-debug.component';
import {HttpClientModule} from '@angular/common/http';
import { DebugCenterComponent } from './debug/debug-center/debug-center.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
