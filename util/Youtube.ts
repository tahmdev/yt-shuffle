import { IVideo } from "../interfaces/IVideo";

export class Youtube {
  static getAllVideosFromPlaylist = async (
    id: String,
    token = ""
  ): Promise<IVideo[]> => {
    const key = process.env.API_KEY;
    let videos: IVideo[] = [];
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}&pageToken=${token}`
    );
    const json = await response.json();
    const { items, nextPageToken } = json;
    videos = [...videos, ...items];
    if (nextPageToken) {
      const nextPage = await this.getAllVideosFromPlaylist(id, nextPageToken);
      videos = [...videos, ...nextPage];
    }
    return videos;
  };
}
