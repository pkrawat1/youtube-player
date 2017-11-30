/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { YoutubeFeedsComponent } from './youtube-feeds.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { YoutubeFeedCardComponent } from 'app/trends/components/youtube-feed-card/youtube-feed-card.component';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { ContextService } from 'app/core/services/context.service';

describe('YoutubeFeedsComponent', () => {
  let component: YoutubeFeedsComponent;
  let fixture: ComponentFixture<YoutubeFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeFeedsComponent, YoutubeFeedCardComponent ],
      imports: [SharedModule, RouterTestingModule],
      providers: [YoutubeService, ContextService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
