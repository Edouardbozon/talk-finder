import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { TalkStore } from '../../services/talk-store/talk-store.service';

@Component({
  selector: 'tf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  title = 'Learn from the bests';

  @ViewChildren('cards', { read: ElementRef }) cardsRef: QueryList<ElementRef>;

  grid: { cols: number; rows: number }[][] = [];

  constructor(
    public talkStore: TalkStore,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.talkStore.talkByChannel
      .pipe(
        tap(talkResources => {
          this.grid = talkResources.map((talkByChannel, i) => talkByChannel.talkResources.map((_, i) => {
            return i === 0 ? { cols: 2, rows: 2 } : { cols: 1, rows: 1 };
          }));
        }),
      )
      .subscribe(); // @todo unsubscribe
  }
}
