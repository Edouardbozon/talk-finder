import { Thumbnails } from './thumbnails';

export enum ResourceType {
  YoutubeVideo = 'youtube#video',
  YoutubeSearch = 'youtube#search',
}

export enum QDefinition {
  HD = 'HD',
  SD = 'SD'
}

export class Talk {
  constructor(
    public uuid: string,
    public title: string,
    public description: string,
    public videoId: string,
    public kind: ResourceType,
    public thumbnails: Thumbnails
  ) { }
}
