import React from 'react';
import TrackList from './TrackList';

function SearchResults(props) {
  return (
    <div>
      <h2>Results</h2>
      <TrackList tracks={props.tracks} onAddTrack={props.onAddTrack} isInPlaylist={false} />
    </div>
  );
}

export default SearchResults;