import { Injectable } from '@angular/core';
import { Talk } from 'src/app/models/talk.model';
import { uuid } from 'src/app/utils/uuid-generator';

@Injectable({
  providedIn: 'root'
})
export class TalkFactory {
  create(title: string, youtubeUrl: string): Talk {
    return new Talk(
      uuid(),
      title,
      youtubeUrl
    );
  }
}
