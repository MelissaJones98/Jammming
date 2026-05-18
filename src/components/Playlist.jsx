import React, { useState } from 'react';
import TrackList from './TrackList';

function Playlist(props) {
  const [playlistName, setPlaylistName] = useState('My Playlist');

  return (
    <div>
      <input
        type="text"
        value={playlistName}
        onChange={e => setPlaylistName(e.target.value)}
      />
      <TrackList tracks={props.tracks} />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;