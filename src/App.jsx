import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const tracks = [
    { id: 1, name: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera" },
    { id: 2, name: "Hotel California", artist: "Eagles", album: "Hotel California" },
    { id: 3, name: "Wonderwall", artist: "Oasis", album: "What's the Story Morning Glory" },
  ];

  const filteredTracks = tracks.filter(track =>
    track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleNameChange(playlistName) {
    setPlaylistName(playlistName);
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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults tracks={filteredTracks} onAddTrack={handleAddTrack} />
      <Playlist tracks={playlistTracks} onRemoveTrack={handleRemoveTrack} playlistName={playlistName} onNameChange={handleNameChange} />
    </div>
  );
}

export default App;