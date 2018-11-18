import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Talk, ResourceType } from '../../models/talk.model';
import { CollectionParameters } from 'src/app/utils/collection-parameters';
import { Collection } from 'src/app/utils/collection';
import { CoreModule } from '../../core.module';

/// <reference path="@types/gapi/index.d.ts" />

@Injectable({ providedIn: CoreModule })
export class TalkFinder {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  listVideoByChannel(
    channelId: string,
    collectionParams: CollectionParameters = new CollectionParameters(),
  ): Observable<Collection<Talk>> {
    let params = new HttpParams()
      .set('channelId', channelId)
      .set('order', 'date')
      .set('maxResults', collectionParams.limit.toString())
      .set('key', environment.youtubeApiKey)
      .set('part', 'snippet');

    if (collectionParams.nextPageToken !== null) {
      params = params.set('pageToken', collectionParams.nextPageToken);
    }

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
  ): Collection<Talk> {
    const resources = response.items.map(searchResource => {
      return new Talk(
        searchResource.snippet.title,
        searchResource.snippet.description,
        searchResource.id.videoId,
        searchResource.id.kind as ResourceType,
        searchResource.snippet.thumbnails,
      );
    });

    return new Collection(resources, response.nextPageToken);
  }
}
