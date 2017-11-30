import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './trends.routing';

import { YoutubeFeedsComponent } from 'app/trends/containers/youtube-feeds/youtube-feeds.component';
import { TrendsComponent } from 'app/trends/trends.component';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { YoutubeFeedCardComponent } from './components/youtube-feed-card/youtube-feed-card.component';

const trendsComponents = [
  YoutubeFeedsComponent,
  TrendsComponent
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    ...trendsComponents,
    YoutubeFeedCardComponent,
  ],
  providers: [
    YoutubeService
  ]
})
export class TrendsModule { }
