import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
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
        payload: { type: "ERROR", text: err.msg, timer: 6000 },
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

  if (!videos?.length)
    return (
      <div className="flex h-full w-full items-center justify-center text-4xl text-white">
        <LoadingSpinner /> Loading...
      </div>
    );

  return (
    <main className="flex h-full items-center justify-center overflow-hidden  text-gray-100">
      <Player videoProps={videos} title background />
    </main>
  );
};

export default Playlists;
