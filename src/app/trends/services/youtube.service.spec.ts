import { Http, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedModule } from 'app/shared/shared.module';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { VideoFeed } from 'app/trends/models/video-feed';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YoutubeService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [SharedModule]
    });
  });

  it('should ...', inject([YoutubeService], (ytService) => {
    expect(ytService).toBeTruthy();
  }));

  describe('getVideos()', () => {
    it('should return an Observable<Array<VideoFeed>>',
      inject([YoutubeService], (ytService) => {
        ytService.getTrendingVideos().subscribe((videos) => {
          expect(videos.length).toBe(24);
        });
      })
    );

    it('should return an Observable<Array<VideoFeed>>',
      inject([YoutubeService], (ytService) => {
        ytService.getTrendingVideos().subscribe((videos) => {
          expect(ytService.nextPageToken).toBeTruthy();
          ytService.resetPageToken();
          expect(ytService.nextPageToken).toEqual('');
        });
      })
    );
  });

  describe('getSingleVideo()', () => {
    it('should return an Observable<VideoFeed>',
      inject([YoutubeService], (ytService) => {
        ytService.maxResult = '1';
        ytService.getTrendingVideos().subscribe((videos) => {
          const videoId = videos[0].id;
          ytService.getVideoDetails(videoId).subscribe((video) => {
            expect(video.id).toBe(videoId);
            expect(video.statistics).toBeDefined();
          });
        });
      })
    );
  });
});
