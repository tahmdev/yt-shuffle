import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "../errors/httpError";
import httpErrorHandling from "../util/httpErrorHandling";
import { Youtube } from "../util/Youtube";

export class VideoController {
  static get = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { ids } = req.query;
      if (typeof ids !== "string") throw new HttpError(400);
      const idArray = ids.split(",");
      const promises = idArray.map((e) => Youtube.getAllVideosFromPlaylist(e));
      const videos = await Promise.all(promises);
      const flatVideos = videos.flat();
      res.status(200).json(flatVideos);
    } catch (error) {
      httpErrorHandling(error, res);
    }
  };
}
