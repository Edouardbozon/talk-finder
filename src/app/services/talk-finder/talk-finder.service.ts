import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { YouTubeTalkFactory } from '../talk-factory/talk-factory.service';
import { map } from 'rxjs/operators';
import { Talk, QDefinition, ResourceType } from 'src/app/models/talk.model';

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

  find() {
    const params = new HttpParams()
      .set('q', 'javascript+typescript')
      .set('key', environment.youtubeApiKey)
      .set('part', 'snippet');

    return this.http
      .get<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>>(
        this.baseUrl,
        { params },
      )
      .pipe(map(this.extractData.bind(this)));
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
