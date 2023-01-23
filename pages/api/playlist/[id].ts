import type { NextApiRequest, NextApiResponse } from "next";
import { PlaylistController } from "../../../controllers/playlistController";
import IPlaylist from "../../../interfaces/IPlaylist";
import httpErrorHandling from "../../../util/httpErrorHandling";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPlaylist>
) {
  try {
    switch (req.method) {
      case "GET":
        PlaylistController.get(req, res);
        break;
    }
  } catch (error) {
    httpErrorHandling(error, res);
  }
}
