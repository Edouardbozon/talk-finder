import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ChannelStore } from '../../services/channel-store/channel-store.service';

@Component({
  selector: 'tf-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {
  title = 'Talk Finder';

  sideNavTitle = 'Channels';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    public channelStore: ChannelStore,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {}
}
