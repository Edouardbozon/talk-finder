import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Channel } from 'src/app/models/channel.model';
import { ChannelFinder } from '../channel-finder/channel-finder.service';
import { relevantChannels } from 'src/app/utils/relevant-channels';

@Injectable({
  providedIn: 'root',
})
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
}
