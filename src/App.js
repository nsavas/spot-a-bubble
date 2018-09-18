import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

import GenreCounter from './Components/GenreCounter';
import ArtistCounter from './Components/ArtistCounter';
// import UserArtists from './Components/UserArtists';
// import UserGenres from './Components/UserGenres';
import Login from './Components/Login';

const headerStyle = {
  "font-size":"50px"
}

const fakeServerData = {
  user: {
    name: 'Bob',
    genreCount: '13',
    artistCount: '67',
    genres: [
      {
        name: 'Rock & Roll',
        artists: ['Led Zeppelin', 'Pink FLoyd', 'Deep Purple']
      },
      {
        name: 'Hip Hop',
        artists: ['Eazy-E', 'Tupac', 'Notorious B.I.G']
      },
      {
        name: 'EDM',
        artists: ['Skrillex', 'Flux Pavilion', 'Diplo', 'Tsuruda']
      }
    ]
  }
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

      : <ul className="artists">{artist.map( artist =>
          <li onClick={this.onGenreClick}> {artist.name} </li> )}
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

    fetch('https://api.spotify.com/v1/me/top/artists?' + query, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      serverData: {
        user: {
          artists: data.items
        }
      }
    }))

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
      serverData: {
        user: {
          email: data.email
        }
      }
    })
    })

  }

  render () {
    return (
      <div className="App">
      {this.state.serverData.user
      ? <div className="logged-in">

        {this.state.serverData.user.artists &&
          <div>
            <h1 style={{...headerStyle}}>

              Hi {this.state.serverData.user.email}! Here is your listening data:

              <h2>
                <GenreCounter genreCount={fakeServerData.user &&
                                        fakeServerData.user.genreCount}/>
                <ArtistCounter artists={fakeServerData.user &&
                                        fakeServerData.user.artistCount}/>
                {console.log(this.state.serverData.user.artists)}
                {this.state.serverData.user.artists.map( artist => <Genres genre={artist}/> )}
              </h2>

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
