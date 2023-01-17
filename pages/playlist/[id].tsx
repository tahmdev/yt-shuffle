import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Player } from "../../components/Player/Player";
import { IVideo } from "../../interfaces/IVideo";
import styles from "../styles/playlists.module.css";

const Playlists: NextPage = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<IVideo[]>();

  async function addVideos(id: string) {
    const response = await fetch(`../api/videos/${id}`);
    if (!response.ok) throw new Error();
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
