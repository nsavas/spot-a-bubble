import React, { Component } from 'react';
import './App.css';

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

class GenreCounter extends Component {
  render() {
    return (
      <div>
      <h2 style={{display: "block", "text-align": "center"}}>
        {this.props.genreCount} Genres
      </h2>
      </div>
    )
  }
}

class ArtistCounter extends Component {
  render() {
    return (
      <div>
        <div>
          <h2 style={{display: "block", "text-align": "center"}}>
            {this.props.artists} Artists
          </h2>
        </div>
      </div>
    )
  }
}

class Genres extends Component {
  render() {

    //  const allGenres = this.props.genres.reduce((genres, eachGenre) => {
    //   return genres.concat(eachGenre.name)
    // }, [])

    return (
      <div className="genres" style={{display: "inline-block", padding: "20px", "text-align": "center", width: "50%"}}>
        <h2>{this.props.genre.name}</h2>
        <ul>
          {this.props.genre.artists.map(artist =>
            <li>{artist}</li>
          )}
        </ul>
      </div>
    )
  }
}

class Artists extends Component {
  render() {

    const allArtists = this.props.artists.reduce((genres, eachGenre) => {
      return genres.concat(eachGenre.artists)
    }, []) 

    return (
      <div>
        <h2>
          Here are the artists: {allArtists}
        </h2>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {}
    };
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData:fakeServerData});
    }, 1000);
  }

  render () {
    return (
      <div className="App">
      {this.state.serverData.user ?
        <div>
          <h1 style={{...headerStyle}}>
            Hi {this.state.serverData.user.name}! Here is your listening data:
          </h1>
          <h2>
            <GenreCounter genreCount={this.state.serverData.user &&
                                  this.state.serverData.user.genreCount}/>
            <ArtistCounter artists={this.state.serverData.user &&
                                    this.state.serverData.user.artistCount}/>
            {
              this.state.serverData.user.genres.map(genre =>
              <Genres genre={genre}/>
            )}
          </h2>
        </div> : <h1 style={{...headerStyle}}>Loading...</h1>
      }
      </div>
    );
  };
};

export default App;
