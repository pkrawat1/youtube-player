import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import * as moment from 'moment';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { ContextService } from 'app/core/services/context.service';
import { VideoFeed } from 'app/trends/models/video-feed';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-youtube-feeds',
  templateUrl: './youtube-feeds.component.html',
  styleUrls: ['./youtube-feeds.component.scss'],
})

export class YoutubeFeedsComponent implements OnInit, OnDestroy {
  public loader: any;
  private country: any;
  private trendingVideos: VideoFeed[] = [];
  private trendingSubs$: Subscription;
  private videoDetailSubs$: Subscription;

  constructor(
    private youtubeService: YoutubeService,
    public appContext: ContextService,
  ) { }

  ngOnInit() {
    this.loadVideos('');
    this.appContext.countryChanged.subscribe(
      (lang) => {
        this.country = this.appContext.getCountry();
        this.trendingVideos = [];
        this.loadVideos(this.country);
      }
    );
  }

  /**
   * sets a subscribtion for retriveing trending
   * videos from youtube api.
   * Updates loader flag before and after request is completed.
   * @param {string} countryCode
   * @memberof YoutubeFeedsComponent
   */
  public loadVideos(countryCode: string): void {
    this.loader = true;
    this.trendingSubs$ = this.youtubeService.getTrendingVideos(this.country).subscribe((videos) => {
      const currentTotal = this.trendingVideos.length;
      const newTotal = currentTotal + videos.length
      for (let i = 0, j = this.trendingVideos.length; i < videos.length; i++, j++) {
        this.trendingVideos[j] = {
          id: videos[i].id,
          title: videos[i].snippet.title,
          thumbnail: videos[i].snippet.thumbnails.high.url,
          publishedAt: moment(videos[i].snippet.publishedAt).fromNow()
        } as VideoFeed;
        this.getVideoStats(j, videos[i].id);
      }
      this.loader = false;
    });
  }

  /**
   * Updates individual video item with
   * there stats to show view and like count
   * @param {number} videoIndex
   * @param {string} videoId
   * @memberof YoutubeFeedsComponent
   */
  public getVideoStats(videoIndex: number, videoId: string): void {
    this.videoDetailSubs$ = this.youtubeService.getVideoDetails(videoId).subscribe((result) => {
      if (this.videoDetailSubs$) { this.videoDetailSubs$.unsubscribe(); }
      // updating reference to trigger change detection
      this.trendingVideos[videoIndex] = {
        ...this.trendingVideos[videoIndex],
        viewCount: result.items[0].statistics.viewCount,
        likeCount: result.items[0].statistics.likeCount
      } as VideoFeed;
    });
  }

  /**
   * Provides a key to *ngFor so that angular
   * can identify which element was removed and added in an efficent manner
   * @param {VideoFeed} item
   * @param {number} _index
   * @returns
   * @memberof YoutubeFeedsComponent
   */
  public trackByFn(item: VideoFeed, _index: number) {
    return item.id;
  }

  ngOnDestroy() {
    this.trendingSubs$.unsubscribe();
    this.videoDetailSubs$.unsubscribe();
  }

  public onScroll() {
    this.loadVideos(this.country);
  }
}
