import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "../errors/httpError";
import httpErrorHandling from "../util/httpErrorHandling";
import { Youtube } from "../util/Youtube";

export class VideoController {
  static get = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      if (typeof id !== "string") throw new HttpError(400);
      const videos = await Youtube.getAllVideosFromPlaylist(id);
      res.status(200).json(videos);
    } catch (error) {
      httpErrorHandling(error, res);
    }
  };
}
