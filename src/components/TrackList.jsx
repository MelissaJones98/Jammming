import React from 'react';
import Track from './Track';

function TrackList(props) {
  return (
    <div>
      {props.tracks.map(track => (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          onAddTrack={props.onAddTrack}
          onRemoveTrack={props.onRemoveTrack}
          track={track}
          isInPlaylist={props.isInPlaylist}
        />
      ))}
    </div>
  );
}

export default TrackList;