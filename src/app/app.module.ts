import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollboxComponent } from './pollbox/pollbox.component';
import { PollListComponent } from './poll-list/poll-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PollboxComponent,
    PollListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
