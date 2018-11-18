import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Talk, ResourceType } from '../../models/talk.model';

/// <reference path="@types/gapi/index.d.ts" />

@Injectable({
  providedIn: 'root',
})
export class TalkFinder {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(
    private http: HttpClient,
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
      return new Talk(
        searchResource.snippet.title,
        searchResource.snippet.description,
        searchResource.id.videoId,
        searchResource.id.kind as ResourceType,
        searchResource.snippet.thumbnails,
      );
    });
  }
}
