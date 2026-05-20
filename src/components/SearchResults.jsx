import React from 'react';
import TrackList from './TrackList';
import './SearchResults.css';

function SearchResults(props) {
  return (
    <div className="search-results">
      <h2>Results</h2>
      {props.searchError && <p>{props.searchError}</p>}
      {!props.hasSearched ? null : props.isLoading ? <p>Searching...</p> : props.searchError ? null : props.tracks.length === 0 ? <p>No results found</p> : <TrackList tracks={props.tracks} onAddTrack={props.onAddTrack} isInPlaylist={false} />}
      {/* error handling - displays if no results are returned after searching */}
    </div>
  );
}

export default SearchResults;