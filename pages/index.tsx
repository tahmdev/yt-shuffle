import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PlaylistCard } from "../components/PlaylistCard";
import useLocalstorage from "../hooks/useLocalStorage";
import IPlaylist from "../interfaces/IPlaylist";
import styles from "../styles/Home.module.css";
import { Youtube } from "../util/Youtube";
import { ToastContext } from "./_app";

export default function Home() {
  const [localPlaylistIDs, setLocalPlaylistIDs] = useLocalstorage<string[]>(
    "playlists",
    []
  );
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const toastDispatch = useContext(ToastContext).dispatch;

  async function addPlaylist(idOrUrl: string) {
    const id = Youtube.playlistIdFromUrl(idOrUrl);
    const response = await fetch(`api/playlist/${id}`);
    if (!response.ok) {
      const err = await response.json();
      toastDispatch({
        type: "ADD",
        payload: { type: "error", text: err.msg },
      });
      return;
    }
    const newPlaylist: IPlaylist = await response.json();

    setPlaylists((prev) =>
      [...prev, newPlaylist].sort((a, b) =>
        a.snippet.title.localeCompare(b.snippet.title)
      )
    );
    setLocalPlaylistIDs([...new Set([...localPlaylistIDs, newPlaylist.id])]);
  }

  function removePlaylist(id: string) {
    setPlaylists((prev) => prev.filter((e) => e.id !== id));
    setLocalPlaylistIDs((prev) => prev.filter((e) => e !== id));
  }

  useEffect(() => {
    localPlaylistIDs.forEach((e) => addPlaylist(e));
  }, []);

  return (
    <>
      <Head>
        <title>Youtube Shuffle</title>
        <meta
          name="Youtube Shuffle"
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

        <h2>Playlists</h2>
        <ul>
          {playlists.map((e, i) => {
            return (
              <li key={i}>
                <PlaylistCard
                  playlist={e}
                  removePlaylist={removePlaylist}
                  setSelectedPlaylists={setSelectedPlaylists}
                />
              </li>
            );
          })}
        </ul>
        <Link href={`/playlist/${selectedPlaylists.join(",")}`}>Shuffle</Link>
      </main>
    </>
  );
}
