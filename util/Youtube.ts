import { HttpError } from "../errors/httpError";
import IPlaylist from "../interfaces/IPlaylist";
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
    if (!response.ok)
      throw new Error("Received an invalid response from the Youtube API");

    const json = await response.json();
    const { items, nextPageToken } = json;
    videos = [...videos, ...items];

    if (nextPageToken) {
      const nextPage = await this.getAllVideosFromPlaylist(id, nextPageToken);
      videos = [...videos, ...nextPage];
    }
    return videos;
  };

  static getPlaylistInfo = async (id: String): Promise<IPlaylist> => {
    const key = process.env.API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet,status&id=${id}&key=${key}`
    );
    if (!response.ok)
      throw new Error("Received an invalid response from the Youtube API");
    const json = await response.json();
    if (json.items.length == 0) throw new HttpError(404);
    return json.items[0];
  };
  };
}
