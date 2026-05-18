import React from 'react';

function Track(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.artist} | {props.album}</p>
      <button>+</button>
    </div>
  );
}

export default Track;