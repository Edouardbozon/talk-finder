import { NgModule, SkipSelf, Optional } from '@angular/core';
import { ShellComponent } from './components/shell/shell.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TalkComponent } from './components/talk/talk.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SharedModule } from '../shared/shared.module';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    ShellComponent,
    DashboardComponent,
    TalkComponent,
    PlayerComponent,
  ],
  imports: [SharedModule],
  exports: [ShellComponent],
  entryComponents: [PlayerComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
