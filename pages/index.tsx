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
  const [unloadedPlaylistIDs, setUnloadedPlaylistIDs] = useState<string[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const toastDispatch = useContext(ToastContext).dispatch;

  async function addPlaylist(idOrUrl: string) {
    const id = Youtube.playlistIdFromUrl(idOrUrl);
    const response = await fetch(`api/playlist/${id}`);
    if (!response.ok) {
      const err = await response.json();
      toastDispatch({ type: "ADD", payload: { type: "error", text: err.msg } });
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

  async function loadPlaylist(id: string) {
    const response = await fetch(`api/playlist/${id}`);
    if (!response.ok) {
      setUnloadedPlaylistIDs((prev) => [...prev, id]);
      return;
    }
    const newPlaylist: IPlaylist = await response.json();

    setPlaylists((prev) =>
      [...prev, newPlaylist].sort((a, b) =>
        a.snippet.title.localeCompare(b.snippet.title)
      )
    );
  }

  function removePlaylist(id: string) {
    setPlaylists((prev) => prev.filter((e) => e.id !== id));
    setLocalPlaylistIDs((prev) => prev.filter((e) => e !== id));
    setUnloadedPlaylistIDs((prev) => prev.filter((e) => e !== id));
  }

  function removeAllUnloaded() {
    unloadedPlaylistIDs.forEach((id) => removePlaylist(id));
  }

  useEffect(() => {
    localPlaylistIDs.forEach((id) => loadPlaylist(id));
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
        {unloadedPlaylistIDs.length > 0 && (
          <>
            <p>
              Unable to load {unloadedPlaylistIDs.length} playlists. Please make
              sure they are not private.{" "}
              <button onClick={removeAllUnloaded}>Remove all</button>
            </p>
            <ul>
              {unloadedPlaylistIDs.map((id, idx) => {
                return (
                  <li key={idx}>
                    Could not load
                    <a href={`https://www.youtube.com/playlist?list=${id}`}>
                      {id}
                    </a>
                    <button onClick={() => removePlaylist(id)}>Remove</button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
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
