import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

// import UserArtists from './Components/UserArtists';
// import UserGenres from './Components/UserGenres';
import Login from './Components/Login';

const headerStyle = {
  "font-size":"50px"
}

function GenreCounter(props) {

  let genreCount = 0;

  props.artists.forEach( (artist) => {
    genreCount += artist.genres.length
  })

  return (
    <h2 style={{display: "block", "text-align": "center"}}>
      {genreCount} Genres
    </h2>
  )
}

function ArtistCounter(props) {

  let artistCount = props.artists.length

  return (
    <h2 style={{display: "block", "text-align": "center"}}>
      from your top {artistCount} artists!
    </h2>
  )
}

class Genres extends Component {
  constructor() {
    super();
    this.state = {
      showGenre: true
    }
  }

  onGenreClick = () => {
    this.setState({
      showGenre: !this.state.showGenre
    })
  }

  render() {
    const artist = this.props.genre;
    return (
      <div className="genres-artists">
      {this.state.showGenre 
      ? <div className="genres">
          <h2 onClick={this.onGenreClick}>
            {artist.genres.map( genre => <h3> {genre} </h3> )}
          </h2>
        </div> 

      : <ul className="artists">
          <li onClick={this.onGenreClick}> {artist.name} </li>
        </ul>
      }
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {}
    }
  };

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    let params = {
      limit: 50,
      time_range: 'long_term'
    };

    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    // Fetch user data from /me endpont
    // Access user display name, email, country, and profile picture
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())

    .then(data => {
      console.log(data)
      this.setState({
        user: {
          email: data.email
        }
      })
    })

    // Fetch top 50 artists
    // Requires query params: (limit, time_range)
    // 'items' contains an array of artists objects
    fetch('https://api.spotify.com/v1/me/top/artists?' + query, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())

    .then(data => this.setState({
      artists: data.items.map(item => ({
        name: item.name,
        genres: item.genres
      }))
    }))

  }

  render () {
    let userArtists = this.state.user && this.state.artists

    return (
      <div className="App">
      {this.state.user
      ? <div className="logged-in">
        {userArtists &&
          <div>
            <h1 style={{...headerStyle}}>
              Hi {this.state.user.email}! Here is your listening data:
              <GenreCounter artists={userArtists}/>
              <ArtistCounter artists={userArtists}/>

              {console.log(userArtists)}
              {userArtists.map( artist => <Genres genre={artist}/> )}
            </h1>
          </div>
        } 
        </div>

      : <Login/>
      }
      </div>
    );
  };
};

export default App;