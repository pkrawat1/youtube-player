import { VideoFeed } from 'app/trends/models/video-feed';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as CONFIG from '../../config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { YTListResponse } from 'app/trends/models/youtube-response';

@Injectable()
export class YoutubeService {

  private options: Object;
  private nextPageToken: string;

  constructor(private http: HttpClient) { }

  getTrendingVideos(country: string): Observable<VideoFeed[]> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('chart', 'mostPopular')
      .set('regionCode', country || 'us')
      .set('maxResults', '24')
      .set('key', CONFIG.youtubeApiKey)
      .set('pageToken', this.nextPageToken || '');

    return this.http
      .get<YTListResponse>(CONFIG.youtubeEndPoint, { params })
      .map(response => {
        this.nextPageToken = response.nextPageToken;
        return response.items;
      })
      .catch(this.throwError);
  }

  resetPageToken() {
    this.nextPageToken = '';
  }

  getVideoDetails(videoId: string) {
    const params = new HttpParams()
      .set('part', 'statistics')
      .set('id', videoId)
      .set('key', CONFIG.youtubeApiKey);

    return this.http
      .get(CONFIG.youtubeEndPoint, {params})
      .catch(this.throwError);
  }

  getTW() {
    let header = new HttpHeaders();
    header.append(
      'Authorization',
      // tslint:disable-next-line:max-line-length
      'OAuth oauth_consumer_key=\'0bkCb5SHZS45Hw34j0COlGJMJ\',oauth_token=\'267615872-IEvDvezamGs2WJUdYZulRVfcNN4vxfkPkBuaoOXc\',oauth_signature_method=\'HMAC-SHA256\',oauth_timestamp=\'1487667635\',oauth_nonce=\'5vG5kL\',oauth_version=\'1.0\',oauth_signature=\'BjtNV8HAbchOV4EhlfGa5wwg2wQnxnc3Tx6xSxa6k5o%3D\'');
    return this.http.get('https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi', { headers: header })
      .catch(this.throwError);
  }

  private throwError(error: any) {
    return Observable.throw(error.status);
  }
}
