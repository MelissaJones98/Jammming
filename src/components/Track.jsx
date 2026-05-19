import React from 'react';

function Track(props) {
  function handleAddTrack() {
    props.onAddTrack(props.track);
  }

  function handleRemoveTrack() {
    props.onRemoveTrack(props.track);
  }

  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.artist} | {props.album}</p>
      {props.isInPlaylist ? 
        <button onClick={handleRemoveTrack}>-</button> 
        : 
        <button onClick={handleAddTrack}>+</button>
      }
    </div>
  );
}

export default Track;