# Codecademy Practice Project: Jammming

## Description
A React web application called Jammming. Using my knowledge of React components, passing state, and requests with the Spotify API I built a website that allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account.

## Features
- Users can search for songs by song title, artist's name and genre.
- Users can see information about each song such as; title, artist, and album for songs they queried.
- Users can export their custom playlist to their personal Spotify account. 

## How to Use
1. Create a Spotify application at developer.spotify.com
2. Add an environment variable to your environment called `VITE_SPOTIFY_API_CLIENT_ID`
3. Make it's value the Client Id of your Spotify application

## Technologies
- HTML
- CSS
- JavaScript
- React
- HTTP Requests and Responses
- Authentication 

## Error Handling and Testing 
Implemented error handling for:
- Search returns no results - shows a message of "No results found" instead of a blank list
- Searh fails - network error or Spotify is down
- Save fails - something goes wrong saving to Spotify
- Playlist is empty when trying to save - nothing to save

### Search returns no results
I used the ternary operator and states to get the handleSearch function to check if the user has run a search, if the results are loading and if there is any results returned by Spotify and
display an appropriate message or the results from Spotify depending on each condition being true or false. To check that it works correctly in all potential scenarios I tested the following 
states:
1. **On load** - just the search bar and playlist should display and just the results heading, no content. 
2. **While searching** - "Searching..." appears briefly while data is requested from Spotify.
3. **Results found** - tracks appear.
4. **No results** - tried "+++++++" in the search bar - as expected displayed "No results found".

### Search fails
I used catch() to catch an error and display a relevant error message if there is a network error or Spotify is down. I tested this by simulating a network error by temporarily breaking the search URL. To do this I temporarily changed the following line in Spotify.js:
`const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {`
to:
`const response = await fetch(`https://api.spotify.com/v1/BROKEN?type=track&q=${term}`, {`
This means that if a network error is caught then the application will display the following message "Something went wrong. Please try again."

### Save fails
I used catch() to catch an error and display the following message "Something went wrong. Please try again." if there is an issue saving the playlist the user tried to create. I tested this by simulating a save failure by temporarily breaking the the playlist URL. To do this I temporarily changed the following line in Spotify.js:
`const playlistResponse = await fetch(`https://api.spotify.com/v1/me/playlists`, {`
to:
`const playlistResponse = await fetch(`https://api.spotify.com/v1/me/playlists`, {`
This means that if there is an error when saving the playlist a user has created the application will display the following error message "Something went wrong. Please try again."

### Playlist is empty when trying to save
I used an if statement to display an error message if the user attempts to save an empty playlist.