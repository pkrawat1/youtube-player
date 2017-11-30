import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedModule } from 'app/shared/shared.module';
import { ContextService } from 'app/core/services/context.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    SharedModule
  ],
  providers: [
    ContextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
