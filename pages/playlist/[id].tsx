import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Player } from "../../components/Player/Player";
import { IVideo } from "../../interfaces/IVideo";
import { ToastContext } from "../_app";

const Playlists: NextPage = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<IVideo[]>();
  const toastDispatch = useContext(ToastContext).dispatch;

  async function addVideos(id: string) {
    const response = await fetch(`../api/videos/${id}`);
    if (!response.ok) {
      const err = await response.json();
      toastDispatch({
        type: "ADD",
        payload: { type: "ERROR", text: err.msg },
      });
      return;
    }
    const videos: IVideo[] = await response.json();
    setVideos(videos);
  }

  useEffect(() => {
    if (typeof router.query.id !== "string") return;
    addVideos(router.query.id);
  }, [router.query]);

  if (!videos?.length) return <div>LOADING...</div>;

  return <Player videoProps={videos} title />;
};

export default Playlists;
