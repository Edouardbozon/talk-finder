import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { TalkFactory } from '../talk-factory/talk-factory.service';
import { map, catchError } from 'rxjs/operators';
import { Talk, ResourceType } from 'src/app/models/talk.model';
import { Observable, of } from 'rxjs';

/// <reference path="@types/gapi/index.d.ts" />

@Injectable({
  providedIn: 'root',
})
export class TalkFinder {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(
    private http: HttpClient,
    private talkFactory: TalkFactory,
  ) {}

  listVideoByChannel(id: string): Observable<Talk[]> {
    const params = new HttpParams()
      .set('channelId', id)
      .set('order', 'date')
      .set('maxResults', (5).toString())
      .set('key', environment.youtubeApiKey)
      .set('part', 'snippet');

    return this.http
      .get<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>>(
        this.baseUrl + '/search',
        { params },
      )
      .pipe(
        map(this.extractData.bind(this)),
        catchError(() => of(null)),
      );
  }

  private extractData(
    response: GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>,
  ): Talk[] {
    return response.items.map(searchResource => {
      return this.talkFactory.create(
        searchResource.snippet.title,
        searchResource.snippet.description,
        searchResource.id.videoId,
        searchResource.id.kind as ResourceType,
        searchResource.snippet.thumbnails,
      );
    });
  }
}
