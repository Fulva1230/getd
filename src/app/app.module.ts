import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PollboxComponent} from './vote-page/pollbox/pollbox.component';
import {PollListComponent} from './vote-page/poll-list/poll-list.component';
import {LoginDebugComponent} from './debug/login-debug/login-debug.component';
import {HttpClientModule} from '@angular/common/http';
import {DebugCenterComponent} from './debug/debug-center/debug-center.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSpinnerModule,
  NbThemeModule,
  NbTimepickerModule,
  NbToastrModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PollboxTableComponent} from './report/pollbox-table/pollbox-table.component';
import {LoginCallbackComponent} from './login/login-callback/login-callback.component';
import {SilentLoginCallbackComponent} from './login/silent-login-callback/silent-login-callback.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DebugTableComponent} from './debug/debug-table/debug-table.component';
import {DeterminesChartComponent} from './report/determines-chart/determines-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DebugDeterminesChartComponent} from './debug/debug-determines-chart/debug-determines-chart.component';
import {ReportMainComponent} from './report/report-main/report-main.component';

@NgModule({
  declarations: [
    AppComponent,
    PollboxComponent,
    PollListComponent,
    LoginDebugComponent,
    DebugCenterComponent,
    PollboxTableComponent,
    LoginCallbackComponent,
    SilentLoginCallbackComponent,
    DebugTableComponent,
    DeterminesChartComponent,
    DebugDeterminesChartComponent,
    ReportMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    NbToastrModule.forRoot({}),
    NbSpinnerModule,
    NgxDatatableModule,
    NgxChartsModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    ReactiveFormsModule,
    NbSelectModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
