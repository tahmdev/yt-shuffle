import { NextApiResponse } from "next";
import { HttpError } from "../errors/httpError";

export default function httpErrorHandling(err: unknown, res: NextApiResponse) {
  console.error(err);
  if (err instanceof HttpError) {
    return res.status(err.code).json({ msg: err.message });
  } else if (err instanceof Error) {
    return res.status(500).json({ msg: err.message });
  } else {
    res.status(500).json({ message: "Something wrong" });
  }
}
