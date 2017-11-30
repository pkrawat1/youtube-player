import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { NgbTypeaheadConfig, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LimitToPipe } from './shared/limit-to.pipe';
import { routing } from './app.routing';

import { ContextService } from './shared/context.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LimitToPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbTypeaheadModule,
    NgbModule,
    Ng2Bs3ModalModule,
    MomentModule,
    routing
  ],
  providers: [
    NgbTypeaheadConfig,
    ContextService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
