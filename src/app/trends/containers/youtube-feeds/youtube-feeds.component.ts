import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { ContextService } from 'app/core/services/context.service';

@Component({
  selector: 'app-youtube-feeds',
  templateUrl: './youtube-feeds.component.html',
  styleUrls: ['./youtube-feeds.component.css'],
})

export class YoutubeFeedsComponent implements OnInit {
  public loader: any;
  private country: any;
  private trendingVideos: any[] = [];

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
    this.youtubeService.getTrendingVideos(this.country).subscribe((result) => {
      for (let i = 0; i < result.items.length; i++) {
        this.trendingVideos[i] = {
          id: result.items[i].id,
          title: result.items[i].snippet.title,
          thumbnail: result.items[i].snippet.thumbnails.high.url,
          publishedAt: moment(result.items[i].snippet.publishedAt).fromNow()
        };
        this.getVideoStats(i, result.items[i].id);
      }
      this.loader = false;
    });
  }

  public getVideoStats(videoIndex: number, videoId: any): void {
    this.youtubeService.getVideoDetails(videoId).subscribe((result) => {
      this.trendingVideos[videoIndex].viewCount = result.items[0].statistics.viewCount;
      this.trendingVideos[videoIndex].likeCount = result.items[0].statistics.likeCount;
    });
  }

  public trackByFn(item, _index) {
    return item.id;
  }
}
