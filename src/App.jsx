import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './Spotify';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  function handleSearch(term) {
    setHasSearched(true);   // error handling - checks if the user has clicked the search button
    setIsLoading(true);     // error handling - checks if the results are loading to prevent a flash of no results while waiting for spotify to respond
    setSearchError(null);   // error handling
    Spotify.search(term).then(results => {
      setSearchResults(results);
      setIsLoading(false);    // sets the loading status back to false so the results from spotify or "no results found" displays
    }).catch(error => {
      setSearchError('Something went wrong. Please try again.'); // error handling - error message will be displayed if search fails. 
      setIsLoading(false);
    });
  }

  function handleAddTrack(track) {
    if (playlistTracks.find(t => t.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  }

  function handleRemoveTrack(track) {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  }

  function handleNameChange(name) {
    setPlaylistName(name);
  }

  async function handleSave() {
    if(playlistTracks.length === 0) {
      setSaveError('The playlist is empty. Please add some songs and try again.')
      return;
    }
    setSaveError(null);
    const trackUris = playlistTracks.map(track => track.uri);
    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    } catch (error) {
      setSaveError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="app">
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="app-content">
        <SearchResults 
          tracks={searchResults} 
          onAddTrack={handleAddTrack} 
          hasSearched={hasSearched}
          isLoading={isLoading} 
          searchError={searchError}
        />
        <Playlist
          tracks={playlistTracks}
          onRemoveTrack={handleRemoveTrack}
          playlistName={playlistName}
          onNameChange={handleNameChange}
          onSave={handleSave}
          saveError={saveError}
        />
      </div>
    </div>
  );
}

export default App;