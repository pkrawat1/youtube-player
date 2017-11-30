import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './trends.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [YoutubeFeedsComponent]
})
export class TrendsModule { }
