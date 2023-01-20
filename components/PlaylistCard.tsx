import React, { Dispatch, SetStateAction } from "react";
import IPlaylist from "../interfaces/IPlaylist";

interface Props {
  playlist: IPlaylist;
  removePlaylist: (id: string) => void;
  setSelectedPlaylists: Dispatch<SetStateAction<string[]>>;
}
export const PlaylistCard: React.FC<Props> = ({
  playlist,
  removePlaylist,
  setSelectedPlaylists,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPlaylists((prev) => [...prev, playlist.id]);
    } else {
      setSelectedPlaylists((prev) => prev.filter((el) => el !== playlist.id));
    }
  };
  return (
    <div className="flex">
      <input
        type="checkbox"
        name="playlist"
        id={playlist.id}
        onChange={onChange}
      />
      <label htmlFor={playlist.id} className="flex">
        <img
          src={playlist.snippet.thumbnails.medium.url}
          alt={`Thumbnail of playlist ${playlist.snippet.title} `}
        />
        <div>
          <span>{playlist.snippet.title} </span>
          <span> {playlist.snippet.channelTitle} </span>
          <span>Length: {playlist.contentDetails.itemCount} </span>
        </div>
      </label>
      <button onClick={() => removePlaylist(playlist.id)}>Remove</button>
    </div>
  );
};
