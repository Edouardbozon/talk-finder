import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TalkFinder } from '../talk-finder/talk-finder.service';
import { tap } from 'rxjs/operators';
import { relevantChannels } from '../../../utils/relevant-channels';
import { Talk } from '../../models/talk.model';

@Injectable({
  providedIn: 'root',
})
export class TalkStore {
  private _talk = new BehaviorSubject<Talk[]>([]);

  public talk: Observable<Talk[]> = this._talk.asObservable();

  constructor(private talkFinder: TalkFinder) {
    relevantChannels.forEach(channel => {
      this.talkFinder
      .listVideoByChannel(channel.channelId)
      .pipe(
        tap(channelResources => {
          this._talk.next([...this._talk.value, ...channelResources]);
        }),
      )
      .subscribe();
    });
  }
}
