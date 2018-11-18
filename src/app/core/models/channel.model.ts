import { Thumbnails } from './thumbnails';
import { Entity } from './abstract-entity';

export class Channel extends Entity {
  constructor(
    public channelId: string,
    public title: string,
    public description: string,
    public thumbnails: Thumbnails,
  ) {
    super();
  }
}
