import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { relevantChannels } from '../../../utils/relevant-channels';
import { TalkByChannel } from '../../models/talk-by-channel';
import { TalkFinder } from '../talk-finder/talk-finder.service';
import { CollectionParameters } from 'src/app/utils/collection-parameters';
import { CoreModule } from '../../core.module';
import { ChannelStore } from '../channel-store/channel-store.service';

@Injectable({ providedIn: CoreModule })
export class TalkStore {
  private _talkByChannel = new BehaviorSubject<TalkByChannel[]>([]);

  public talkByChannel: Observable<
    TalkByChannel[]
  > = this._talkByChannel.asObservable();

  constructor(
    private talkFinder: TalkFinder,
    private channelStore: ChannelStore,
  ) {
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
              new TalkByChannel(
                relevantChannels[i].channelId,
                this.channelStore.getOneById(relevantChannels[i].channelId),
                _talkByChannel,
              ),
          ),
        ),
        tap(talkByChannel => {
          this._talkByChannel.next([
            ...this._talkByChannel.value,
            ...talkByChannel,
          ]);
        }),
      )
      .subscribe();
  }

  loadMore(channelId: string, nextPageToken: string): void {
    this.talkFinder
      .listVideoByChannel(channelId, new CollectionParameters(nextPageToken, 8))
      .pipe(
        tap(nextTalkByChannel => {
          const updatedTalkByChannel = this._talkByChannel.value.map(
            talkByChannel => {
              if (channelId === talkByChannel.channelId) {
                return talkByChannel.addResources(nextTalkByChannel);
              }

              return talkByChannel;
            },
          );

          this._talkByChannel.next(updatedTalkByChannel);
        }),
      )
      .subscribe();
  }
}
