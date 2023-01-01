import Head from "next/head";
import { useEffect, useState } from "react";
import { PlaylistCard } from "../components/PlaylistCard";
import useLocalstorage from "../hooks/useLocalStorage";
import IPlaylist from "../interfaces/IPlaylist";
import styles from "../styles/Home.module.css";
import { Youtube } from "../util/Youtube";

export default function Home() {
  const [localPlaylistIDs, setLocalPlaylistIDs] = useLocalstorage<string[]>(
    "playlists",
    []
  );

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");

  async function addPlaylist(idOrUrl: string) {
    const id = Youtube.playlistIdFromUrl(idOrUrl);
    const response = await fetch(`api/playlist/${id}`);
    if (!response.ok) return;
    const newPlaylist: IPlaylist = await response.json();

    // Don't allow duplicates
    if (playlists.some((e) => e.id === newPlaylist.id)) return;
    const newState = [...playlists, newPlaylist];
    setPlaylists([...newState]);
    setLocalPlaylistIDs([...newState].map((e) => e.id));
  }

  useEffect(() => {
    localPlaylistIDs.forEach((e) => addPlaylist(e));
  }, []);

  return (
    <>
      <Head>
        <title>Youtube Shuffle</title>
        <meta
          name="description"
          content="Shuffle and combine large Youtube playlists"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <input
            name="playlist-input"
            type="text"
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Playlist ID or URL"
          />
          <button onClick={() => addPlaylist(currentInput)}>add</button>
        </div>

        <ul>
          {playlists.map((e, i) => {
            return (
              <li key={i}>
                <PlaylistCard playlist={e} />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
