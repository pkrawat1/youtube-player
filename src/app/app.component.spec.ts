import { SharedModule } from 'app/shared/shared.module';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from 'app/shared/header/header.component';

import {
  RouterTestingModule
} from '@angular/router/testing';
import { ContextService } from 'app/core/services/context.service';
import { Router, RouterModule } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        RouterModule
      ],
      providers: [ContextService]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it(`should set router subscription for window scroll`, inject([Router], (router) => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.routerSubs$).toBe(undefined);
    spyOn(app, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(app.routerSubs$).toBeDefined();
    router.navigate(['/']);
    expect(window.pageYOffset).toBe(0);
  }));
});
