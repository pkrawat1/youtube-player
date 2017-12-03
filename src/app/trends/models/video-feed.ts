export interface VideoFeed {
  id: string;
  statistics?: {
    likeCount: number;
    viewCount: number;
  };
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string
      }
    };
    publishedAt: string;
  }
};
