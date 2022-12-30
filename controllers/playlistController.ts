import { NextApiRequest, NextApiResponse } from "next";
import httpErrorHandling from "../util/httpErrorHandling";
import { Youtube } from "../util/Youtube";

export class PlaylistController {
  static get = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      if (typeof id !== "string") throw new Error();
      const playlist = await Youtube.getPlaylistInfo(id);
      res.status(200).json(playlist);
    } catch (error) {
      httpErrorHandling(error, res);
    }
  };
}
