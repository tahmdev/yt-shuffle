import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { PlaylistCard } from "../components/PlaylistCard";
import useLocalstorage from "../hooks/useLocalStorage";
import IPlaylist from "../interfaces/IPlaylist";
import { Youtube } from "../util/Youtube";
import { ToastContext } from "./_app";

export default function Home() {
  const [localPlaylistIDs, setLocalPlaylistIDs] = useLocalstorage<string[]>(
    "playlists",
    []
  );
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [unloadedPlaylistIDs, setUnloadedPlaylistIDs] = useState<string[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<IPlaylist[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const toastDispatch = useContext(ToastContext).dispatch;

  async function addPlaylist(idOrUrl: string) {
    const id = Youtube.playlistIdFromUrl(idOrUrl);
    const response = await fetch(`api/playlist/${id}`);
    if (!response.ok) {
      const err = await response.json();
      toastDispatch({
        type: "ADD",
        payload: { type: "ERROR", text: err.msg, timer: 5000 },
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
    setPlaylists((prev) => prev.filter((el) => el.id !== id));
    setLocalPlaylistIDs((prev) => prev.filter((el) => el !== id));
    setUnloadedPlaylistIDs((prev) => prev.filter((el) => el !== id));
    setSelectedPlaylists((prev) => prev.filter((el) => el.id !== id));
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
      <main className="mx-auto flex w-11/12 max-w-2xl flex-col items-center gap-3 overflow-hidden bg-gray-800 text-gray-100 [&>*:first-child]:mt-6 [&>*:last-child]:mb-6">
        <div className="flex w-full justify-center gap-3">
          <input
            className=" w-full max-w-2xl rounded-sm p-1 text-black "
            name="playlist-input"
            type="text"
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Playlist ID or Youtube URL"
          />
          <Button onClick={() => addPlaylist(currentInput)}>Add</Button>
        </div>

        {unloadedPlaylistIDs.length > 0 && (
          <div className="w-full rounded-md border-2 border-red-900 bg-red-800 p-2 text-gray-100 shadow-inner ">
            <div className="flex gap-2 font-bold">
              <p className="">
                Unable to load {unloadedPlaylistIDs.length} playlists. Please
                make sure they are not private.
              </p>
              <button onClick={removeAllUnloaded}>Remove all</button>
            </div>

            <ul className="mt-4">
              {unloadedPlaylistIDs.map((id, idx) => {
                return (
                  <li key={idx} className="mb-1 flex gap-2 last:mb-0">
                    <p className="overflow-hidden overflow-ellipsis">
                      Could not load{" "}
                      <a
                        className="underline"
                        href={`https://www.youtube.com/playlist?list=${id}`}
                      >
                        {id}
                      </a>
                    </p>

                    <button
                      className="underline"
                      onClick={() => removePlaylist(id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <h2 className="text-3xl">Playlists</h2>
        <ul className="flex max-h-70vh w-full flex-col gap-2 overflow-y-scroll border-2 border-slate-100">
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
        <Link
          className={`inline-block w-full max-w-xs rounded py-2 px-4 text-center text-xl font-bold text-white
              ${
                selectedPlaylists.length
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "pointer-events-none bg-blue-900 text-gray-400"
              }
            `}
          href={
            selectedPlaylists.length
              ? `/playlist/${selectedPlaylists.map((el) => el.id).join(",")}`
              : ""
          }
        >
          {`Shuffle ${selectedPlaylists.reduce(
            (acc, curr) => curr.contentDetails.itemCount + acc,
            0
          )} videos`}
        </Link>
      </main>
    </>
  );
}
