import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch() {
    props.onSearch(searchTerm);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;