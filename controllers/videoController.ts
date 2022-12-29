import { NextApiRequest, NextApiResponse } from "next";
import { Youtube } from "../util/Youtube";

export class VideoController {
  static get = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (typeof id !== "string") throw new Error();
    const videos = await Youtube.getAllVideosFromPlaylist(id);
    res.status(200).json(videos);
  };
}
