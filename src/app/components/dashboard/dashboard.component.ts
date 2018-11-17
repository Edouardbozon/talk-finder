import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
  OnInit,
} from '@angular/core';
import { map, tap, mapTo } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TalkStore } from 'src/app/services/talk-store/talk-store.service';

@Component({
  selector: 'tf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren('cards', { read: ElementRef }) cardsRef: QueryList<ElementRef>;

  grid: {cols: number; rows: number }[] = [];

  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 4, rows: 1 },
  //         { title: 'Card 2', cols: 4, rows: 1 },
  //         { title: 'Card 3', cols: 4, rows: 1 },
  //         { title: 'Card 4', cols: 4, rows: 1 },
  //         { title: 'Card 5', cols: 4, rows: 1 },
  //         { title: 'Card 6', cols: 4, rows: 1 },
  //         { title: 'Card 7', cols: 4, rows: 1 },
  //         { title: 'Card 8', cols: 4, rows: 1 },
  //         { title: 'Card 9', cols: 4, rows: 1 },
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 2 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 1 },
  //       { title: 'Card 4', cols: 1, rows: 1 },
  //       { title: 'Card 5', cols: 1, rows: 1 },
  //       { title: 'Card 6', cols: 1, rows: 1 },
  //       { title: 'Card 7', cols: 1, rows: 1 },
  //       { title: 'Card 8', cols: 1, rows: 1 },
  //       { title: 'Card 9', cols: 1, rows: 1 },
  //     ];
  //   }),
  // );

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
