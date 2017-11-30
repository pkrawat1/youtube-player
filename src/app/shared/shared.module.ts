import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextService } from 'app/shared/services/context.service';
import { LimitToPipe } from 'app/shared/pipes/limit-to.pipe';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbTypeaheadModule, NgbModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
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
    MomentModule
  ],
  declarations: [
    ...sharedComponents,
    LimitToPipe,
  ],
  providers: [
    ContextService,
    NgbTypeaheadConfig
  ],
  exports: [
    HeaderComponent,
    LimitToPipe,
  ]
})
export class SharedModule { }
