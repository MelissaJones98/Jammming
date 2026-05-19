import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './Spotify';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  function handleSearch(term) {
    Spotify.search(term).then(results => {
      setSearchResults(results);
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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults tracks={searchResults} onAddTrack={handleAddTrack} />
      <Playlist
        tracks={playlistTracks}
        onRemoveTrack={handleRemoveTrack}
        playlistName={playlistName}
        onNameChange={handleNameChange}
      />
    </div>
  );
}

export default App;