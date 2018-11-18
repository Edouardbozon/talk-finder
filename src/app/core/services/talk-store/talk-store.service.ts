import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { relevantChannels } from '../../../utils/relevant-channels';
import { TalkByChannel } from '../../models/talk-by-channel';
import { TalkFinder } from '../talk-finder/talk-finder.service';

@Injectable({
  providedIn: 'root',
})
export class TalkStore {
  private _talkByChannel = new BehaviorSubject<TalkByChannel[]>([]);

  public talkByChannel: Observable<TalkByChannel[]> = this._talkByChannel.asObservable();

  constructor(private talkFinder: TalkFinder) {
    of(relevantChannels)
      .pipe(
        map(channels => channels.map(_channel => _channel.channelId)),
        mergeMap(channelIds =>
          forkJoin(
            channelIds.map(channelId =>
              this.talkFinder.listVideoByChannel(channelId),
            ),
          ),
        ),
        map(talkByChannel =>
          talkByChannel.map(
            (_talkByChannel, i) =>
              new TalkByChannel(relevantChannels[i].channelId, _talkByChannel),
          ),
        ),
        tap(talkByChannel => {
          this._talkByChannel.next([...this._talkByChannel.value, ...talkByChannel]);
        })
      )
      .subscribe();
  }
}
