export interface IVideo {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
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

interface Thumbnails {
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
