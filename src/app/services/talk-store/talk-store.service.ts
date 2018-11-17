import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Talk } from 'src/app/models/talk.model';
import { TalkFinder } from '../talk-finder/talk-finder.service';
import { tap, mergeMapTo } from 'rxjs/operators';
import { relevantChannels } from '../../utils/relevant-channels';

@Injectable({
  providedIn: 'root',
})
export class TalkStore {
  private _talk = new BehaviorSubject<Talk[]>([]);

  public talk: Observable<Talk[]> = this._talk.asObservable();

  constructor(private talkFinder: TalkFinder) {
    relevantChannels.forEach(channel => {
      this.talkFinder
      .listVideoByChannel(channel.youtubeChannelId)
      .pipe(
        tap(channelResources => {
          this._talk.next([...this._talk.value, ...channelResources]);
        }),
      )
      .subscribe();
    });
  }
}
