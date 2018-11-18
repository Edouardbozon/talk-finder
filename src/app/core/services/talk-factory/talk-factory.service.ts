import { Injectable } from '@angular/core';
import {
  Talk,
  YouTubeTalk,
  ResourceType,
} from '../../models/talk.model';
import { uuid } from 'src/app/utils/uuid-generator';
import { Thumbnails } from '../../models/thumbnails';

@Injectable({
  providedIn: 'root',
})
export class TalkFactory {
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