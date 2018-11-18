import { Thumbnails } from './thumbnails';
import { Entity } from './abstract-entity';

export enum ResourceType {
  YoutubeVideo = 'youtube#video',
  YoutubeSearch = 'youtube#search',
}

export enum QDefinition {
  HD = 'HD',
  SD = 'SD'
}

export class Talk extends Entity {
  constructor(
    public title: string,
    public description: string,
    public videoId: string,
    public kind: ResourceType,
    public thumbnails: Thumbnails
  ) {
    super();
  }
}
