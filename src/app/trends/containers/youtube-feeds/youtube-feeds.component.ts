import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild } from '@angular/core';

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
  public country: any;
  public trendingVideos: VideoFeed[] = [];
  public isNewSearch = true;
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
        this.resetAllSubscription();
        window.scrollTo(0, 0);
        this.isNewSearch = true;
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
    this.trendingSubs$ = this.youtubeService
      .getTrendingVideos(this.country)
      .subscribe(
        (videos) => {

          // Tracks incremental data on infinte scroll
          let startIndex = this.trendingVideos.length;
          this.trendingVideos = [...this.trendingVideos, ...videos]

          if (this.isNewSearch) {
            startIndex = 0;
            this.trendingVideos = [...videos]
          }

          videos.map(video => this.getVideoStats(startIndex++, video.id))
          this.loader = false;
        },
        error => console.log(error)
    );
  }

  /**
   * Updates individual video item with
   * there stats to show view and like count
   * @param {number} videoIndex
   * @param {string} videoId
   * @memberof YoutubeFeedsComponent
   */
  public getVideoStats(videoIndex: number, videoId: string): void {
    this.videoDetailSubs$ = this.youtubeService
      .getVideoDetails(videoId)
      .subscribe(
        (video) => {
          if (this.videoDetailSubs$) { this.videoDetailSubs$.unsubscribe(); }
          // updating reference to trigger change detection
          this.trendingVideos[videoIndex] = {
            ...this.trendingVideos[videoIndex],
            statistics: video.statistics
          };
        },
        error => console.log(
          `unable to load video with id: ${videoId} with error => `,
          error
        )
      );
  }

  /**
   * Provides a key to *ngFor so that angular
   * can identify which element was removed and added in an efficent manner
   * @param {number} index
   * @param {VideoFeed} _item
   * @returns
   * @memberof YoutubeFeedsComponent
   */
  public trackByFn(index: number, _item: VideoFeed) {
    return index;
  }

  ngOnDestroy() {
    this.resetAllSubscription();
  }

  public onScroll() {
    this.isNewSearch = false;
    this.loadVideos(this.country);
  }

  private resetAllSubscription() {
    if (this.trendingSubs$) { this.trendingSubs$.unsubscribe(); }
    if (this.videoDetailSubs$) { this.videoDetailSubs$.unsubscribe(); }
  }
}
