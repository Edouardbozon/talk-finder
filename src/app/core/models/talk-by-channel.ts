import { Talk } from './talk.model';
import { Entity } from './abstract-entity';

export class TalkByChannel extends Entity {
  constructor(
    public channelId: string,
    public talkResources: Talk[],
  ) {
    super();
  }
}
