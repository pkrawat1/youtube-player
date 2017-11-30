import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-youtube-feed-card',
  templateUrl: './youtube-feed-card.component.html',
  styleUrls: ['./youtube-feed-card.component.scss']
})
export class YoutubeFeedCardComponent implements OnInit {
  @Input() video;

  constructor() { }

  ngOnInit() {
  }

}
