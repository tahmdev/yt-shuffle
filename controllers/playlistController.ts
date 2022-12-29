import { NextApiRequest, NextApiResponse } from "next";
import IPlaylist from "../interfaces/IPlaylist";
import { Youtube } from "../util/Youtube";

export class PlaylistController {
  static get = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (typeof id !== "string") throw new Error();
    const playlist: IPlaylist = { id: "a", name: "a" };
    const videos = await Youtube.getAllVideosFromPlaylist(id);
    res.status(200).json(videos);
  };
}
