import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { YouTubeTalkFactory } from '../talk-factory/talk-factory.service';
import { map, catchError } from 'rxjs/operators';
import { Talk, QDefinition, ResourceType } from 'src/app/models/talk.model';
import { Observable, of } from 'rxjs';

/// <reference path="@types/gapi/index.d.ts" />

@Injectable({
  providedIn: 'root',
})
export class TalkFinder {
  private baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(
    private http: HttpClient,
    private youTubeTalkFactory: YouTubeTalkFactory,
  ) {}

  find(): Observable<Talk[]> {
    const params = new HttpParams()
      .set('q', 'javascript+typescript')
      .set('maxResults', (20).toString())
      .set('key', environment.youtubeApiKey)
      .set('part', 'snippet');

    return this.http
      .get<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>>(
        this.baseUrl,
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
      return this.youTubeTalkFactory.create(
        searchResource.snippet.title,
        searchResource.snippet.description,
        searchResource.id.videoId,
        searchResource.id.kind as ResourceType,
      );
    });
  }
}
