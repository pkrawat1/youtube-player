import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './trends.routing';

import { YoutubeFeedsComponent } from 'app/trends/containers/youtube-feeds/youtube-feeds.component';
import { TrendsComponent } from 'app/trends/trends.component';
import { YoutubeService } from 'app/trends/services/youtube.service';

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
    ...trendsComponents
  ],
  providers: [
    YoutubeService
  ]
})
export class TrendsModule { }
