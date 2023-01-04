export interface IVideo {
  etag: string;
  id: string;
  kind: string;
  snippet: snippet;
}

interface snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: IResourceID;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

interface IResourceID {
  kind: string;
  videoId: string;
}

export interface IThumbnails {
  default: IResolution;
  medium: IResolution;
  high: IResolution;
  standard: IResolution;
  maxres: IResolution;
}

interface IResolution {
  url: string;
  width: number;
  height: number;
}
