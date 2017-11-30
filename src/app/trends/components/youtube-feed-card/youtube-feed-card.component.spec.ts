import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeFeedCardComponent } from './youtube-feed-card.component';

describe('YoutubeFeedCardComponent', () => {
  let component: YoutubeFeedCardComponent;
  let fixture: ComponentFixture<YoutubeFeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeFeedCardComponent ]
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
