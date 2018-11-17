import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatGridTile } from '@angular/material';
import { Talk } from '../talk/talk.component';

@Component({
  selector: 'tf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren('cards', { read: ElementRef }) cardsRef: QueryList<ElementRef>;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 4, rows: 1 },
          { title: 'Card 2', cols: 4, rows: 1 },
          { title: 'Card 3', cols: 4, rows: 1 },
          { title: 'Card 4', cols: 4, rows: 1 },
          { title: 'Card 5', cols: 4, rows: 1 },
          { title: 'Card 6', cols: 4, rows: 1 },
          { title: 'Card 7', cols: 4, rows: 1 },
          { title: 'Card 8', cols: 4, rows: 1 },
          { title: 'Card 9', cols: 4, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 2 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Card 5', cols: 1, rows: 1 },
        { title: 'Card 6', cols: 1, rows: 1 },
        { title: 'Card 7', cols: 1, rows: 1 },
        { title: 'Card 8', cols: 1, rows: 1 },
        { title: 'Card 9', cols: 1, rows: 1 },
      ];
    }),
  );

  talks: Talk[] = [
    { title: 'Hey' },
    { title: 'Hey' },
    { title: 'Hey' },
    { title: 'Hey' },
    { title: 'Hey' },
    { title: 'Hey' },
    { title: 'Hey' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
