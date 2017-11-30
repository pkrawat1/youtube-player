import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';

import { LimitToPipe } from 'app/shared/pipes/limit-to.pipe';

import { NgbTypeaheadModule, NgbModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'angular2-moment';

const sharedComponents = [HeaderComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbTypeaheadModule,
    NgbModule,
    MomentModule,
    InfiniteScrollModule
  ],
  declarations: [
    ...sharedComponents,
    LimitToPipe,
  ],
  providers: [
    NgbTypeaheadConfig
  ],
  exports: [
    HeaderComponent,
    LimitToPipe
  ]
})
export class SharedModule { }
