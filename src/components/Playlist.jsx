import React, { useState } from 'react';
import TrackList from './TrackList';
import './Playlist.css';

function Playlist(props) {
  return (
    <div className="playlist">
      <input
        type="text"
        value={props.playlistName}
        onChange={e => props.onNameChange(e.target.value)}
      />
      {props.saveError && <p>{props.saveError}</p>}
      <TrackList tracks={props.tracks} onRemoveTrack={props.onRemoveTrack} isInPlaylist={true} />
      <button className="playlist-save" onClick={props.onSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;