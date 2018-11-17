import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { map, tap, mapTo } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TalkStore } from 'src/app/services/talk-store/talk-store.service';

@Component({
  selector: 'tf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  @ViewChildren('cards', { read: ElementRef }) cardsRef: QueryList<ElementRef>;

  grid: {cols: number; rows: number }[] = [];

  constructor(
    public talkStore: TalkStore,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.talkStore.talk.pipe(
      tap(talkResources => {
        this.grid = talkResources.map((_, i) => {
          return i === 0 ?
          { cols: 2, rows: 2 } :
          { cols: 1, rows: 1 };
        });
      })
    ).subscribe();
  }
}
