import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { VideoFeed } from 'app/trends/models/video-feed';

@Component({
  selector: 'app-youtube-feed-card',
  templateUrl: './youtube-feed-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./youtube-feed-card.component.scss']
})
export class YoutubeFeedCardComponent implements OnInit {
  @Input() video: VideoFeed;

  constructor() { }

  ngOnInit() {
  }

}
