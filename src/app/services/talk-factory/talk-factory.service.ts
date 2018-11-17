import { Injectable } from '@angular/core';
import { Talk, YouTubeTalk, QDefinition, ResourceType } from 'src/app/models/talk.model';
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
  ): Talk {
    return new YouTubeTalk(uuid(), title, description, videoId, kind);
  }
}
