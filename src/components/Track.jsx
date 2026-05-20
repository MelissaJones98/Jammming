import React from 'react';
import './Track.css';

function Track(props) {
  function handleAddTrack() {
    props.onAddTrack(props.track);
  }

  function handleRemoveTrack() {
    props.onRemoveTrack(props.track);
  }

  return (
    <div className="track">
      <div className="track-info">
        <h3>{props.name}</h3>
        <p>{props.artist} | {props.album}</p>
        {props.isInPlaylist ? 
          <button onClick={handleRemoveTrack}>-</button> 
          : 
          <button onClick={handleAddTrack}>+</button>
        }
      </div>
    </div>
  );
}

export default Track;