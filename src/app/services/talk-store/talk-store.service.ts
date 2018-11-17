import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Talk } from 'src/app/models/talk.model';
import { TalkFinder } from '../talk-finder/talk-finder.service';

@Injectable({
  providedIn: 'root',
})
export class TalkStore {
  private _talk = new BehaviorSubject<Talk[]>([]);
  public talk: Observable<Talk[]> = this._talk.asObservable();

  constructor(private talkFinder: TalkFinder) {
    this.talkFinder
      .find()
      .subscribe(talkResouces => this._talk.next(talkResouces));
  }
}
