import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Channel } from '../../models/channel.model';
import { ChannelFinder } from '../channel-finder/channel-finder.service';
import { relevantChannels } from 'src/app/utils/relevant-channels';
import { CoreModule } from '../../core.module';

@Injectable({ providedIn: CoreModule })
export class ChannelStore {
  private _channel = new BehaviorSubject<Channel[]>([]);

  public channel: Observable<Channel[]> = this._channel.asObservable();

  constructor(private channelFinder: ChannelFinder) {
    relevantChannels.forEach(channel => {
      this.channelFinder
        .getById(channel.channelId)
        .subscribe(channelResources =>
          this._channel.next([...this._channel.value, ...channelResources]),
        );
    });
  }

  getOneById(channelId: string): Channel {
    return this._channel.value.filter(
      channel => channel.channelId === channelId,
    )[0];
  }
}
