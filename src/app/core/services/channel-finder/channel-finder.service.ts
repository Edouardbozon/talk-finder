import { Injectable } from '@angular/core';
import { Channel } from '../../models/channel.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Thumbnails } from '../../models/thumbnails';

/// <reference path="@types/gapi/index.d.ts" />

@Injectable({
  providedIn: 'root',
})
export class ChannelFinder {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Channel[]> {
    const params = new HttpParams()
      .set('id', id)
      .set('key', environment.youtubeApiKey)
      .set('part', 'snippet,contentDetails,brandingSettings');

    return this.http
      .get<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeChannelResource>>(
        this.baseUrl + '/channels',
        { params },
      )
      .pipe(
        map(this.extractData.bind(this)),
        catchError(() => of(null)),
      );
  }

  private extractData(
    response: GoogleApiYouTubePaginationInfo<GoogleApiYouTubeChannelResource>,
  ): Channel {
    const channel = response.items[0];
    return new Channel(
      channel.id,
      channel.brandingSettings.channel.title,
      channel.brandingSettings.channel.description,
      channel.snippet.thumbnails as Thumbnails,
    );
  }
}
