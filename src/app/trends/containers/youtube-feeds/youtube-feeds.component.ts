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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./youtube-feeds.component.css'],
})

export class YoutubeFeedsComponent implements OnInit, OnDestroy {
  public loader: any;
  private country: any;
  private trendingVideos: VideoFeed[] = [];
  private trendingSubs$: Subscription;
  private videoDetailSubs$: Subscription;

  constructor(
    private youtubeService: YoutubeService,
    public appContext: ContextService
  ) { }

  ngOnInit() {
    this.loadVideos('');
    this.appContext.countryChanged.subscribe(
      (lang) => {
        this.country = this.appContext.getCountry();
        this.loadVideos(this.country);
      }
    );
  }

  public loadVideos(countryCode: string): void {
    this.loader = true;
    this.trendingSubs$ = this.youtubeService.getTrendingVideos(this.country).subscribe((result) => {
      for (let i = 0; i < result.items.length; i++) {
        this.trendingVideos[i] = {
          id: result.items[i].id,
          title: result.items[i].snippet.title,
          thumbnail: result.items[i].snippet.thumbnails.high.url,
          publishedAt: moment(result.items[i].snippet.publishedAt).fromNow()
        } as VideoFeed;
        this.getVideoStats(i, result.items[i].id);
      }
      this.loader = false;
    });
  }

  public getVideoStats(videoIndex: number, videoId: any): void {
    this.videoDetailSubs$ = this.youtubeService.getVideoDetails(videoId).subscribe((result) => {
      if (this.videoDetailSubs$) { this.videoDetailSubs$.unsubscribe(); }
      this.trendingVideos[videoIndex].viewCount = result.items[0].statistics.viewCount;
      this.trendingVideos[videoIndex].likeCount = result.items[0].statistics.likeCount;
    });
  }

  public trackByFn(item, _index) {
    return item.id;
  }

  ngOnDestroy() {
    this.trendingSubs$.unsubscribe();
    this.videoDetailSubs$.unsubscribe();
  }
}
