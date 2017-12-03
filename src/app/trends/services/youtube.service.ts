import { VideoFeed } from 'app/trends/models/video-feed';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retry';

import * as CONFIG from '../../config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { YTListResponse } from 'app/trends/models/youtube-response';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class YoutubeService {

  private options: Object;
  public nextPageToken: string;
  public maxResults = '24';

  constructor(
    private http: HttpClient,
    private toastyService: ToastyService
  ) { }

  getTrendingVideos(country: string): Observable<VideoFeed[]> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('chart', 'mostPopular')
      .set('regionCode', country || 'us')
      .set('maxResults', this.maxResults)
      .set('key', CONFIG.youtubeApiKey)
      .set('pageToken', this.nextPageToken || '');

    return this.http
      .get<YTListResponse>(CONFIG.youtubeEndPoint, { params })
      .map(response => {
        this.nextPageToken = response.nextPageToken;
        this.toastyService.error({
          title: 'ERROR!!',
          msg: 'test'
        });
        return response.items;
      })
      .retry(2)
      .catch(error => this.throwError(error));
  }

  /**
   * Reset nextPageToken on new search
   *
   * @memberof YoutubeService
   */
  resetPageToken(): void {
    this.nextPageToken = '';
  }

  /**
   * Video stats to show view and like count
   *
   * @param {string} videoId
   * @returns {Observable<VideoFeed>}
   * @memberof YoutubeService
   */
  getVideoDetails(videoId: string): Observable<VideoFeed> {
    const params = new HttpParams()
      .set('part', 'statistics')
      .set('id', videoId)
      .set('key', CONFIG.youtubeApiKey);

    return this.http
      .get<YTListResponse>(CONFIG.youtubeEndPoint, {params})
      .map(response => response.items[0])
      .retry(2)
      .catch(error => this.throwError(error));
  }

  // getTW() {
  //   let header = new HttpHeaders();
  //   header.append(
  //     'Authorization',
      // tslint:disable-next-line:max-line-length
  //     'OAuth oauth_consumer_key=\'0bkCb5SHZS45Hw34j0COlGJMJ\',oauth_token=\'267615872-IEvDvezamGs2WJUdYZulRVfcNN4vxfkPkBuaoOXc\',oauth_signature_method=\'HMAC-SHA256\',oauth_timestamp=\'1487667635\',oauth_nonce=\'5vG5kL\',oauth_version=\'1.0\',oauth_signature=\'BjtNV8HAbchOV4EhlfGa5wwg2wQnxnc3Tx6xSxa6k5o%3D\'');
  //   return this.http.get('https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi', { headers: header })
  //     .catch(error => this.throwError(error));
  // }

  private throwError(error: any) {
    this.toastyService.error({
      title: 'ERROR!!',
      msg: error.status
    });
    return Observable.throw(error.status);
  }
}
