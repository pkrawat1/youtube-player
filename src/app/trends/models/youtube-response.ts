import { VideoFeed } from './video-feed';

export interface YTListResponse {
  nextPageToken: string;
  items: VideoFeed[];
}

export interface YTStatsResponse {
  nextPageToken: string;
  items: VideoFeed[];
}
