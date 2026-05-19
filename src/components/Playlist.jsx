import React, { useState } from 'react';
import TrackList from './TrackList';

function Playlist(props) {

  return (
    <div>
      <input
        type="text"
        value={props.playlistName}
        onChange={e => props.onNameChange(e.target.value)}
      />
      <TrackList tracks={props.tracks} onRemoveTrack={props.onRemoveTrack} isInPlaylist={true} />
      <button onClick={props.onSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;