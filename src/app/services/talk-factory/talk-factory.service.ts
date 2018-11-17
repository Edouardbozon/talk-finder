import { Injectable } from '@angular/core';
import {
  Talk,
  YouTubeTalk,
  QDefinition,
  ResourceType,
  Thumbnails,
} from 'src/app/models/talk.model';
import { uuid } from 'src/app/utils/uuid-generator';

@Injectable({
  providedIn: 'root',
})
export class YouTubeTalkFactory {
  create(
    title: string,
    description: string,
    videoId: string,
    kind: ResourceType,
    thumbnails: Thumbnails,
  ): Talk {
    return new YouTubeTalk(
      uuid(),
      title,
      description,
      videoId,
      kind,
      thumbnails,
    );
  }
}
