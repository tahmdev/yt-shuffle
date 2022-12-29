import type { NextApiRequest, NextApiResponse } from "next";
import { PlaylistController } from "../../../controllers/playlistController";
import IPlaylist from "../../../interfaces/IPlaylist";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case "GET":
        PlaylistController.get(req, res);
        break;
    }
  } catch (error) {}
}
