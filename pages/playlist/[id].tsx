import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IVideo } from "../../interfaces/IVideo";
import styles from "../styles/playlists.module.css";

const Playlists: NextPage = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<IVideo[]>();

  async function addVideos(id: string) {
    const response = await fetch(`../api/videos/${id}`);
    console.log(response);

    if (!response.ok) throw new Error();
    const videos: IVideo[] = await response.json();
    console.log(videos);

    setVideos(videos);
  }

  useEffect(() => {
    if (typeof router.query.id !== "string") return;
    console.log(router.query.id);

    addVideos(router.query.id);
  }, [router.query]);

  if (!videos?.length) return <div>LOADING...</div>;

  return (
    <div>
      <ul>
        {videos.map((e, i) => {
          return <li key={i}>{e.snippet.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Playlists;
