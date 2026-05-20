const clientId = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID;
const redirectUri = 'http://127.0.0.1:5173';

console.log(clientId)

async function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

const Spotify = {
  async getAccessToken() {
    const token = localStorage.getItem('spotify_access_token');
    const expiry = localStorage.getItem('spotify_token_expiry');

    if (token && expiry && Date.now() < Number(expiry)) {
      return token;
    }

    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      const verifier = localStorage.getItem('spotify_code_verifier');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: verifier,
        }),
      });
      
      const data = await response.json();
      localStorage.setItem('spotify_access_token', data.access_token);
      localStorage.setItem('spotify_token_expiry', Date.now() + data.expires_in * 1000);
      window.history.pushState({}, '', '/');
      return data.access_token;
    }

    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('spotify_code_verifier', verifier);

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private&code_challenge_method=S256&code_challenge=${challenge}`;
  },

  async search(term) {
    const token = await Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error('Search failed');
    }
    const data = await response.json();
    if (!data.tracks) return [];
    return data.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) return;

        const token = await Spotify.getAccessToken();

        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userResponse.json();
        if(!userResponse.ok) {
          throw new Error('Failed to get user data');
        }
        
        const userId = userData.id;

        const playlistResponse = await fetch(`https://api.spotify.com/v1/me/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, public: false, description: "Playlist created by Jammming" })
        });
        const playlistData = await playlistResponse.json();
        if(!playlistResponse.ok) {
          throw new Error('Failed to create playlist');
        }
        const playlistId = playlistData.id;

        const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: trackUris })
        });
        const tracksData = await tracksResponse.json();
        if(!tracksResponse.ok) {
          throw new Error('Failed to add tracks');
        }
    }
};

export default Spotify;