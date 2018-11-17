import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { ShellComponent } from './components/shell/shell.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TalkComponent } from './components/talk/talk.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    DashboardComponent,
    TalkComponent,
    ShellComponent,
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    HttpClientModule,
    YoutubePlayerModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
