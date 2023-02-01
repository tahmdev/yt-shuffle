import React, { Dispatch, SetStateAction, useState } from "react";
import IPlaylist from "../interfaces/IPlaylist";

interface Props {
  playlist: IPlaylist;
  removePlaylist: (id: string) => void;
  setSelectedPlaylists: Dispatch<SetStateAction<IPlaylist[]>>;
}
export const PlaylistCard: React.FC<Props> = ({
  playlist,
  removePlaylist,
  setSelectedPlaylists,
}) => {
  const [checked, setChecked] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked(true);
      setSelectedPlaylists((prev) => [...prev, playlist]);
    } else {
      setChecked(false);
      setSelectedPlaylists((prev) => prev.filter((el) => el !== playlist));
    }
  };
  return (
    <div
      className={`flex ${
        checked ? "bg-slate-700" : "bg-slate-500 hover:bg-slate-600"
      }`}
    >
      <input
        className="hidden"
        type="checkbox"
        name="playlist"
        id={playlist.id}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={playlist.id} className="flex h-24 w-full cursor-pointer">
        <img
          className="h-full"
          src={playlist.snippet.thumbnails.medium.url}
          alt={`Thumbnail of playlist ${playlist.snippet.title} `}
        />
        <div className="flex flex-col justify-center">
          <span>{playlist.snippet.title} </span>
          <span> {playlist.snippet.channelTitle} </span>
          <span>Length: {playlist.contentDetails.itemCount} </span>
        </div>
      </label>
      <button
        aria-label={`Remove playlist ${playlist.snippet.title}`}
        className="my-auto ml-auto mr-2 aspect-square rounded bg-red-500 py-1 px-3 font-bold"
        onClick={() => removePlaylist(playlist.id)}
      >
        🗑️
      </button>
    </div>
  );
};
