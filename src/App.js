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
      <h2>
        You listen to {this.props.genreCount} different genres.
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
          <h2>
            and {this.props.artists} different artists!
          </h2>
        </div>
      </div>
    )
  }
}

class Genres extends Component {
  render() {

    const allGenres = this.props.genres.reduce((genres, eachGenre) => {
      return genres.concat(eachGenre.name)
    }, []) 

    return (
      <div>
        <h2>
          Here are the genres: {allGenres}
        </h2>
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
            <Genres genres={this.state.serverData.user &&
                            this.state.serverData.user.genres}/>
            <Artists artists={this.state.serverData.user &&
                              this.state.serverData.user.genres}/>

          </h2>
        </div> : <h1 style={{...headerStyle}}>Loading...</h1>
      }
      </div>
    );
  };
};

export default App;
