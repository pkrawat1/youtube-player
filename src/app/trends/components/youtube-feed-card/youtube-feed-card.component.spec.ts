import { VideoFeed } from 'app/trends/models/video-feed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeFeedCardComponent } from './youtube-feed-card.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { ContextService } from 'app/core/services/context.service';

describe('YoutubeFeedCardComponent', () => {
  let component: YoutubeFeedCardComponent;
  let fixture: ComponentFixture<YoutubeFeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeFeedCardComponent ],
      imports: [SharedModule, RouterTestingModule],
      providers: [YoutubeService, ContextService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeFeedCardComponent);
    component = fixture.componentInstance;

    const snippet = {
      title: 'title',
      thumbnails: {
        high: {
          url: 'url'
        }
      },
      publishedAt: `017-12-03T05:46:28.000Z`
    }

    const statistics = {
      likeCount: 0,
      viewCount: 0
    }

    component.video = {
      id: '',
      statistics: statistics,
      snippet: snippet
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get snippet, thumbnail_url, statistics', () => {
    fixture.detectChanges();

    expect(component.snippet).toBe(component.video.snippet);
    expect(component.snippet.thumbnails.high.url).toBe(component.thumbnail_url);
    expect(component.statistics).toBe(component.statistics);
  });
});
