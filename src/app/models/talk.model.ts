export enum ResourceType {
  YoutubeVideo = 'youtube#video',
  YoutubeSearch = 'youtube#search',
}

export interface Talk {
  uuid: string;
  title: string;
  description: string;
  videoId: string;
  kind: ResourceType;
}

export enum QDefinition {
  HD = 'HD',
  SD = 'SD'
}

export class YouTubeTalk implements Talk {
  constructor(
    public uuid: string,
    public title: string,
    public description: string,
    public videoId: string,
    public kind: ResourceType
  ) { }
}
