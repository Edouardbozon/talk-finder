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
import { TalkFinder } from '../../services/talk-finder/talk-finder.service';
import { CollectionParameters } from 'src/app/utils/collection-parameters';

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
    private talkFinder: TalkFinder,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.talkStore.talkByChannel
      .pipe(
        tap(talk => {
          this.grid = talk.map(talkByChannel =>
            talkByChannel.talk.resources.map((_, i) => {
              return i === 0 ? { cols: 2, rows: 2 } : { cols: 1, rows: 1 };
            }),
          );
        }),
      )
      .subscribe(); // @todo unsubscribe
  }

  loadMore(channelId: string, nextPageToken: string): void {
    this.talkStore.loadMore(
      channelId,
      nextPageToken,
    );
  }
}
