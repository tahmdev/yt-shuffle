import { HttpError } from "../errors/httpError";
import IPlaylist from "../interfaces/IPlaylist";
import { IVideo } from "../interfaces/IVideo";

export class Youtube {
  static getAllVideosFromPlaylist = async (id: String): Promise<IVideo[]> => {
    const key = process.env.API_KEY;
    let videos: IVideo[] = [];
    let nextPageToken = "";

    do {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}&pageToken=${nextPageToken}`
      );
      if (!response.ok) {
        throw new HttpError(
          502,
          "Received an invalid response from the Youtube API"
        );
      }
      const json = await response.json();
      videos = [...videos, ...json.items];
      nextPageToken = json.nextPageToken;
    } while (nextPageToken);

    const availableVideos = videos.filter(
      (e) => e.snippet.videoOwnerChannelId !== undefined
    );

    return availableVideos;
  };

  static getPlaylistInfo = async (id: String): Promise<IPlaylist> => {
    const key = process.env.API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet,status&id=${id}&key=${key}`
    );
    if (!response.ok)
      throw new HttpError(
        502,
        "Received an invalid response from the Youtube API"
      );
    const json = await response.json();
    if (json.items.length == 0)
      throw new HttpError(
        404,
        `Could not find playlist ${id}. Make sure it's not private.`
      );
    return json.items[0];
  };

  static playlistIdFromUrl = (url: string): string => {
    const reg = new RegExp("[&?]list=([a-z0-9_-]+)", "i");
    const match = reg.exec(url);

    if (match && match[1].length > 0) {
      return match[1];
    } else {
      return url;
    }
  };
}
