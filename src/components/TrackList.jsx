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
          track={track}
        />
      ))}
    </div>
  );
}

export default TrackList;