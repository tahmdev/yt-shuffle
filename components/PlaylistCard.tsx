import Link from "next/link";
import React from "react";
import IPlaylist from "../interfaces/IPlaylist";

interface Props {
  playlist: IPlaylist;
  removePlaylist: (id: string) => void;
}
export const PlaylistCard: React.FC<Props> = ({ playlist, removePlaylist }) => {
  return (
    <div className="flex">
      <Link href={`/playlist/${playlist.id}`} className="flex">
        <img
          src={playlist.snippet.thumbnails.medium.url}
          alt={`Thumbnail of playlist ${playlist.snippet.title} `}
        />
        <div>
          <span>{playlist.snippet.title} </span>
          <span> {playlist.snippet.channelTitle} </span>
          <span>Length: {playlist.contentDetails.itemCount} </span>
        </div>
      </Link>
      <button onClick={() => removePlaylist(playlist.id)}>Remove</button>
    </div>
  );
};
