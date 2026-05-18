import React from 'react';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';

function App() {
  const tracks = [
    { id: 1, name: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera" },
    { id: 2, name: "Hotel California", artist: "Eagles", album: "Hotel California" },
    { id: 3, name: "Wonderwall", artist: "Oasis", album: "What's the Story Morning Glory" },
  ];

  return (
    <div>
      <SearchBar />
      <TrackList tracks={tracks} />
    </div>
  );
}

export default App;
