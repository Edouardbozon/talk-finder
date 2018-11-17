import { uuid } from '../utils/uuid-generator';
import { Thumbnails } from './thumbnails';

export class Channel {
  public uuid = uuid();

  constructor(
    public channelId: string,
    public title: string,
    public description: string,
    public thumbnails: Thumbnails,
  ) {}
}
