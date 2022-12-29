import type { NextApiRequest, NextApiResponse } from "next";
import { VideoController } from "../../../controllers/videoController";
import { IVideo } from "../../../interfaces/IVideo";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVideo[]>
) {
  try {
    switch (req.method) {
      case "GET":
        VideoController.get(req, res);
        break;
    }
  } catch (error) {}
}
