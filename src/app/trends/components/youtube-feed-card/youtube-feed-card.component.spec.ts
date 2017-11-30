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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
