import React from 'react';

function Track(props) {
  function handleAddTrack() {
    props.onAddTrack(props.track);
  }

  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.artist} | {props.album}</p>
      <button onClick={handleAddTrack}>+</button>
    </div>
  );
}

export default Track;